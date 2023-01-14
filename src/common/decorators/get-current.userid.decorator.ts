import {createParamDecorator,ExecutionContext} from '@nestjs/common'
import { JwtPayload } from 'src/types'


export const GetCurrentUserId = createParamDecorator(
    (_:undefined,context:ExecutionContext) :number =>{
        console.log("o")
        const request = context.switchToHttp().getRequest()
        const user = request.user as JwtPayload
        console.log(user)
        return user.sub
    }
)