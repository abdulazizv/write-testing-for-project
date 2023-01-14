import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { AuthDto } from 'src/admin/dto/auth.dto';
import { Customer } from './customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { JwtPayload, JwtPayloadCustomer, Tokens } from 'src/types';
@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private customerRepository: typeof Customer,
    private readonly jwtService: JwtService,
  ) {}

  async signup(authdto: AuthDto, res: Response) {
    const { name, email, password } = authdto;
    const lastName = name.split(' ');
    const last_name = lastName[1];
    const first_name = lastName[0];
    const candidate = await this.customerRepository.findOne({
      where: {
        email: email,
      },
    });
    if (candidate) {
      throw new BadRequestException('Bunday email mavjud');
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newCustomer = await this.customerRepository.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      hashed_password: hashedPassword,
    });
    newCustomer.save();
    const tokens = await this.getTokens(newCustomer.id, newCustomer.email);
    await this.updateRefreshTokenHash(newCustomer.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async signin(authDto: AuthDto, res: Response) {
    const { name, email, password } = authDto;
    const user = await this.customerRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Acces Denied');
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.hashed_password,
    );
    if (!passwordMatches) throw new ForbiddenException('Acces Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async logout(userId: number, res: Response) {
    const admin = await this.customerRepository.update(
      {
        hashed_refresh_token: null,
      },
      {
        where: {
          id: userId,
        },
      },
    );
    if (!admin) throw new ForbiddenException('access denied');
    await res.clearCookie('refresh_token');
    return true;
  }

  async refreshTokens(userId: number, res: Response): Promise<Tokens> {
    const customer = await this.customerRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!customer || !customer.hashed_refresh_token) {
      throw new ForbiddenException('Acces Denied');
    }

    // const rtMatches = await bcrypt.compare(
    //   refreshToken,
    //   admin.hashed_refresh_token,
    // );
    // if (!rtMatches) throw new ForbiddenException('Acces Denied');

    const tokens = await this.getTokens(customer.id, customer.email);
    await this.updateRefreshTokenHash(customer.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }
  async create(createCustomerDto: CreateCustomerDto) {
    const check = await this.customerRepository.create({
      first_name: createCustomerDto.first_name,
      last_name: createCustomerDto.last_name,
      phone: createCustomerDto.phone,
      email: createCustomerDto.email,
      gender: createCustomerDto.gender,
      lang_id: createCustomerDto.lang_id,
    });
    return check
  }

  async findAll() {
    return await this.customerRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.customerRepository.findByPk(+id);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const check = await this.customerRepository.findByPk(id);
    if (!check) {
      throw new HttpException('Id is incorrect', HttpStatus.BAD_REQUEST);
    }
    // const newCustomer = await this.customerRepository.update(
    //   {
    //     ...updateCustomerDto,
    //   },
    //   { where: { id: id }, returning: true },
    // );
    return check;
  }

  async delete(id: number) {
    await this.customerRepository.destroy({
      where: {
        id: +id,
      },
    });
    return true
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayloadCustomer = {
      sub: userId,
      email: email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.customerRepository.update(
      {
        hashed_refresh_token: hashedRefreshToken,
      },
      { where: { id: userId }, returning: true },
    );
  }
}
