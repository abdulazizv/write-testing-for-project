import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthDto } from './dto/auth.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Request, Response } from 'express';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { adminGuard } from '../common/guards/admin.guard';
import { isCreatorGuard } from '../common/guards/isCreatorOrId.guard';
import { Admin } from './admin.model';
import { checkCreator } from '../common/guards/is_creator.guard';

interface RequestWithUserNameAndAdmin extends Request {
  admin: string;
  username: string;
}

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Adminni qo'shish" })
  @ApiResponse({ status: 201, type: Admin })
  @UseGuards(adminGuard)
  @UseGuards(isCreatorGuard)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Adminlarni olish' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(adminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Adminni olish' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(isCreatorGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: "Adminni o'zgartirish" })
  @ApiResponse({ status: 203, type: Admin })
  @UseGuards(isCreatorGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({ status: 202, type: Admin })
  @UseGuards(isCreatorGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.adminService.delete(+id);
  }

  @ApiOperation({ summary: 'Adminni active qilish' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(checkCreator)
  @Post('admin/active/:id')
  activeAdmin(@Param('id') id: number) {
    return this.adminService.activeAdmin(+id);
  }

  @ApiOperation({ summary: "Adminni ro'yxatdan o'tkazish" })
  @ApiResponse({ status: 200, type: Admin })
  @Post('admin/signup')
  signup(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.adminService.signup(authDto, res);
  }

  @ApiOperation({ summary: "Adminni qayta ro'yxatdan o'tkazish" })
  @ApiResponse({ status: 200, type: Admin })
  @Post('admin/signin')
  signin(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.adminService.signin(authDto, res);
  }

  @ApiOperation({ summary: 'Adminni logout qilishi' })
  @ApiResponse({ status: 200, type: Boolean })
  @Post('admin/logout/:id')
  @HttpCode(HttpStatus.OK)
  logout(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
    return this.adminService.logout(id, res);
  }

  @ApiOperation({ summary: 'Adminni olish' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(adminGuard)
  @Post('admin/refresh/:id')
  async refreshToken(
    @Param('id') id: number,
    @Res({ passthrough: true }) res: Response,
    @Req() req: RequestWithUserNameAndAdmin,
  ) {
    return this.adminService.refreshTokens(id, res, req);
  }
}
