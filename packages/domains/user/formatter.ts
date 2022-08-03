import { ReturnedUser, User } from './types';

const publicFields = ['email', 'first_name', 'last_name', 'company_name'];

export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function secureTrim(user: User): string {
  return JSON.stringify(user, publicFields);
}

export function format(rawUser): ReturnedUser {
  return {
    id: rawUser.id,
    email: rawUser.email,
    first_name: capitalize(rawUser.first_name),
    last_name: capitalize(rawUser.last_name),
    company_name: rawUser.company_name,
    ssn: rawUser.ssn,
  };
}
