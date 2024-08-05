import { IAuthService } from '../../interfaces/IAuthService';
import { User } from '../../models/user';
import { injectable } from 'tsyringe';

@injectable()
export class AuthServiceMock implements IAuthService {
  public async signin(_data: FormData): Promise<User> {
    return {
      first_name: 'Test',
      last_name: 'User',
    };
  }
}
