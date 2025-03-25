import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private userService : UserService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : 'abc1234'
        })
    }

    async validate(payload: any) {
        const user = await this.userService.getUser(payload.id);
        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }
        return user; 
    }
    
    
}