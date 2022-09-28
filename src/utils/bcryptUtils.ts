import bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const saltRounds = 10;
  const passwordCrypted = bcrypt.hashSync(password, saltRounds);
  return passwordCrypted;
}

export function comparePasswords(passwordToValidate: string, passwordCrypted: string) {
  const compareResult = bcrypt.compareSync(passwordToValidate, passwordCrypted);
  if (!compareResult) {
    return false;
  } else {
    return true;
  }
}
