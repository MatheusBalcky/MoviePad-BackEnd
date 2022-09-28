import * as interfaces from '../interfaces/interfaces';
import * as authRepos from '../repositories/authRepositories';
import * as bcrypt from '../utils/bcryptUtils';
import * as jwt from '../utils/jwtUtils';

export async function signUp(userData: interfaces.userData) {
  const user = await authRepos.findUserByEmail(userData.email.toLocaleLowerCase());
  if (user) throw { type: 'conflict', message: 'conflict' };

  const encryptedPassword = bcrypt.hashPassword(userData.password);
  return await authRepos.insertUser({ email: userData.email.toLowerCase(), password: encryptedPassword });
}

export async function signIn(userData: interfaces.userData) {
  const user = await authRepos.findUserByEmail(userData.email.toLowerCase());
  if (!user) throw { type: 'unauthorized', message: 'unauthorized invalid email' };

  const result = bcrypt.comparePasswords(userData.password, user.password);
  if (!result) throw { type: 'unauthorized', message: 'unauthorized invalid password' };

  const token = jwt.createToken({ userId: user.id });

  return token;
}
