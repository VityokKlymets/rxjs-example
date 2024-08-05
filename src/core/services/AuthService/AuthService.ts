import { IAuthService } from '../../interfaces/IAuthService';
import { User } from '../../models/user';
import axios from 'axios';
import { injectable } from 'tsyringe';

const baseApi = import.meta.env.REACT_APP_BASE_API;

@injectable()
export class AuthService implements IAuthService {
  public async signin(data: FormData) {
    const response = await axios.post<User>(`${baseApi}/signin`, data);
    return response.data;
  }
}
