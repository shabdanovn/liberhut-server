import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 'email', description: 'Email of a user'})
    readonly email: string

    @ApiProperty({example: '********', description: 'Password of a user'})
    readonly password: string

    @ApiProperty({example: 'densmith', description: 'Username of a user'})
    readonly username: string

    @ApiProperty({example: 'img link', description: 'Image of a user'})
    readonly img: string

    @ApiProperty({example: 'Bishkek', description: 'City of a user'})
    readonly city: string
}