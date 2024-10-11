import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class BusinessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key']

    if (!apiKey || apiKey !== 'login') {
      throw new UnauthorizedException('Acceso no autorizado')
    }

    return next.handle()
  }
}
