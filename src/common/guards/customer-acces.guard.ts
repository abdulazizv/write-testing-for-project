import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AccessDeniedError } from 'sequelize';

@Injectable()
export class customerIdGuard implements CanActivate {
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
    const customer = this.jwtService.verify(token,{publicKey:process.env.REFRESH_TOKEN_KEY})
    if(customer.sub !== +id){
        throw new UnauthorizedException({
            message:"Foydalanuvchi yoki admin yoki faqat o'ziga ta'sir ko'rsata oladi !"
        })
    }
    return true
    }catch(error){
      console.log(error)
    }
  }
}