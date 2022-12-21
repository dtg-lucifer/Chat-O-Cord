import { User } from 'src/utils/typeorm';
import { ValidateUserCredentials } from 'src/utils/types';

export interface IAuthService {
  validateUser(
    validateUserCredentials: ValidateUserCredentials,
  ): Promise<User | null>;
}
