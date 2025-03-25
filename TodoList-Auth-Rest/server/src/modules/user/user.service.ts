import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async getUsers() {
        return await this.userRepository.find();
    }

    async getUser(id: number) {
        const user = await this.userRepository.findOneBy({ id }) ;
        if(user)
            return user 
        return "User not found";
    }
    async getUserDetails(email: string) {
        const user = await this.userRepository.findOneBy({ email }) ;
        if(user)
          return omit(user, ['password']);

        return "User not found";
    }
    
    async loginUser(email: string, password: string) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            return null;
        }
        if (user.password !== password) {
            return null;
        }
        const token = this.jwtService.sign({ id: user.id, name: user.firstName });
        return token;
        
    }

    async addUser(firstName: string, lastName: string, email: string, phone: string, password: string) {
        const user = new UserEntity();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        user.password = password; 

        await this.userRepository.save(user);
        return user;
    }

    async updateUser(id: number, firstName?: string, lastName?: string, email?: string, phone?: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            return ('User not found');
        }

        user.firstName = firstName ?? user.firstName;
        user.lastName = lastName ?? user.lastName;
        user.email = email ?? user.email;
        user.phone = phone ?? user.phone;

        await this.userRepository.save(user);
        return user;
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            return ('User not found');
        }

        await this.userRepository.remove(user);
        return 'User deleted successfully';
    }
}
