import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException,  UseGuards, Req, Res  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';


///admin endpoint for loggin in
@Controller('admin')
export class AuthController {
    /**
     * Creates an instance of AuthController.
     * 
     * @param authService The auth service.
     * @returns An instance of AuthController.
     * 
    */
    constructor(private authService: AuthService) {

    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    public async adminLogin(
      @Body() credentials: { username: string, password: string },
    ) {
      const token = await this.authService.login(credentials.username, credentials.password);
      return { token };
    }
  
    // @UseGuards(AuthGuard('jwt'))
    // @Post('logout')
    // async logout(@Req() req, @Res() res: Response) {
    //     // Invalidate the token if using a token blacklist approach
    //     // For now, just send a response to indicate successful logout
    //     res.clearCookie('jwt'); // if you're storing JWT in cookies
    //     res.status(200).send({ message: 'Logout successful' });
    // }
}
