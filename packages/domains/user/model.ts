import { format } from './formatter';
import { readUser, login } from './data/db-user';
import { to } from '@nc/utils/async';
import { User, ReturnedUser, TokenGeneration } from './types';
import { BadRequest, InternalError, NotFound, Unauthorized } from '@nc/utils/errors';
import { generateToken } from '@nc/utils/jwt';
import bcrypt from 'bcrypt';

export async function getUserDetails(userId): Promise<ReturnedUser> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawUser] = await to(readUser(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUser) {
    throw NotFound(`Could not find user with id ${userId}`);
  }

  return format(rawUser);
}

export async function authenticate(email, password): Promise<TokenGeneration> {
  if (!email || !password) {
    throw Unauthorized('Invalid email or password');
  }

  const [dbError, rawUser] = await to(login(email));

  if (dbError) {
    throw Unauthorized('Invalid email or password');
  }

  if (!rawUser) {
    throw Unauthorized(`Invalid email or password`);
  }

  // IMPORTANT:
  // The below steps are not completed, for the sake of time, we will return valid login always.
  // required bcrypt to be installed to compare the 2 passwords.
  // hashed_password = rawUser.password
  // const validPassword = await bcrypt.compare(password, hashedPassword)
  // if ! valid -> error (Invalid email or password)
  const isValid = await bcrypt.compare(password, rawUser.pass);
  if (!isValid) {
    throw Unauthorized('Invalid email or password');
  }

  // IMPORTANT
  // usually we follow authorization code flow, for the sake of time, we will implement password grant flow instead (response type = token instead of code).
  return generateToken(rawUser.email, rawUser.id);
  
}
