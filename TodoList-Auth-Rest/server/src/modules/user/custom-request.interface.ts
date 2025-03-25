import { Request } from 'express';
import { UserEntity } from './user.entity';

export interface CustomRequest extends Request {
    user: UserEntity;
}
