import { faker } from '@faker-js/faker';

export function generateSignUpData() {
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: password,
    passwordConfirm: password
  };
}
