import { AuthServiceMock } from './AuthService/AuthServiceMock';
import { container } from 'tsyringe';

container.register('AuthService', AuthServiceMock);
