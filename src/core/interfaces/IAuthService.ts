import { User } from '../models/user';

export interface IAuthService {
  signin: (_data: FormData) => Promise<User>;
}
