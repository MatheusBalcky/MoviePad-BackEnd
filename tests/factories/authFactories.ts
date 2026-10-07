export async function generateSignUpData() {
  const { faker } = await import('@faker-js/faker');
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: password,
    passwordConfirm: password
  };
}
