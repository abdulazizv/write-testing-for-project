import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { AuthDto } from './dto/auth.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from 'src/types';
import { Response } from 'express';
import { Request } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private Adminrepository: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async signup(authdto: AuthDto, res: Response) {
    const { name, email, password } = authdto;
    const candidate = await this.Adminrepository.findOne({
      where: {
        login: email,
      },
    });
    if (candidate) {
      throw new BadRequestException('Bunday email mavjud');
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newAdmin = await this.Adminrepository.create({
      name: name,
      login: email,
      hashed_password: hashedPassword,
    });
    const tokens = await this.getTokens(
      newAdmin.id,
      newAdmin.login,
      newAdmin.is_active,
      newAdmin.is_creator,
    );
    await this.updateRefreshTokenHash(newAdmin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async signin(authDto: AuthDto, res: Response) {
    const { name, email, password } = authDto;
    const admin = await this.Adminrepository.findOne({
      where: {
        login: email,
      },
    });

    if (!admin) {
      throw new ForbiddenException('Acces Denied');
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.hashed_password,
    );
    if (!passwordMatches) throw new ForbiddenException('Acces Denied');

    const tokens = await this.getTokens(
      admin.id,
      admin.login,
      admin.is_active,
      admin.is_creator,
    );
    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async activeAdmin(id: number): Promise<Admin> {
    const currentAdmin = await this.Adminrepository.findOne({
      where: {
        id: id,
      },
    });
    if (!currentAdmin) throw new ForbiddenException('Id is incorrect');
    currentAdmin.is_active = true;
    return currentAdmin;
  }
  async logout(userId: number, res: Response) {
    const admin = await this.Adminrepository.update(
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
    res.clearCookie('refresh_token');
    return true;
  }

  async refreshTokens(
    userId: number,
    res: Response,
    req: Request,
  ): Promise<Tokens> {
    const admin = await this.Adminrepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!admin || !admin.hashed_refresh_token) {
      throw new ForbiddenException('Acces Denied');
    }

    const tokens = await this.getTokens(
      admin.id,
      admin.login,
      admin.is_active,
      admin.is_creator,
    );
    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }
  async create(createAdminDto: CreateAdminDto) {
    return await this.Adminrepository.create(createAdminDto);
  }

  async findAll() {
    return await this.Adminrepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.Adminrepository.findByPk(+id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const check = await this.Adminrepository.findOne({
      where: {
        id: id,
      },
    });
    if (!check) {
      throw new HttpException(
        'ID is incorrect,Information not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const oneUpdate = await this.Adminrepository.update(
      {
        ...updateAdminDto,
      },
      {
        where: {
          id: id,
        },
        returning: true,
      },
    );
    return check;
  }

  async delete(id: number) {
    const check = await this.Adminrepository.findOne({
      where: {
        id: id,
      },
    });
    await this.Adminrepository.destroy({
      where: {
        id: id,
      },
    });
    return true;
  }

  async getTokens(
    userId: number,
    email: string,
    is_active: boolean,
    is_creator: boolean,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      is_active: is_active,
      is_creator: is_creator,
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
    adminId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.Adminrepository.update(
      {
        hashed_refresh_token: hashedRefreshToken,
      },
      { where: { id: adminId }, returning: true },
    );
  }

  async findByToken(id: number, token: string) {
    const admin = await this.Adminrepository.findByPk(+id);
    const rtMatches = await bcrypt.compare(token, admin.hashed_refresh_token);
    if (!rtMatches) throw new ForbiddenException('Acces Denied');
    return admin;
  }
}
