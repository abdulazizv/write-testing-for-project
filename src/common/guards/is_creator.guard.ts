import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class checkCreator implements CanActivate {
    constructor(
      private readonly jwtService:JwtService
      ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try{
    const req = context.switchToHttp().getRequest()
    const adminHeader = req.headers.authorization
    const id = req.params.id
    const bearer = adminHeader.split(' ')[0]
    const token = adminHeader.split(' ')[1]
    if(bearer !== "Bearer" || !token ){
        throw new UnauthorizedException({
            message:"Foydalanuvchi avtorizatsiyadan o'tmagan"
        })
    }
    const admin = this.jwtService.verify(token,{publicKey:process.env.ACCESS_TOKEN_KEY})
    if(admin.is_creator === false){
        throw new HttpException(
            'Bu funksiya faqat creator uchun.',
            HttpStatus.FORBIDDEN
        )
    }
    return true
    }catch(error){
      console.log(error)
    }
  }
}