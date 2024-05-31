import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersDao } from '../users/users.dao';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(
        username: string, 
        password: string
    ): Promise<{ access_token: string } | UnauthorizedException> {
        /**
         * Signs in an admin given a username and password.
         * 
         * @param username The username of the admin.
         * @param password The password of the admin.
         * @returns An object containing the jwt access token.
         * @throws If the username or password is invalid.
         */

        const admin = await this.usersService.getAdminByUsername(username);
        if (!admin || admin.password !== password) {
            console.error('Invalid credentials for:', username);
            throw new UnauthorizedException('Invalid username or password');
        }
        const payload = { sub: admin.id, username: admin.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
