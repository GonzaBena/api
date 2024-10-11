// user.dto.ts
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator'

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string
}
