import {createParamDecorator,ExecutionContext} from '@nestjs/common'
import { JwtPayloadWithRefreshToken } from 'src/types'


export const GetCurrentUser = createParamDecorator(
    (
    data:keyof JwtPayloadWithRefreshToken | undefined,
    context:ExecutionContext
    )=>{
        const request = context.switchToHttp().getRequest()
        console.log(data)
        
        console.log(request.admin)

        if(!data) return request.admin
        return request.user[data]
    }
)