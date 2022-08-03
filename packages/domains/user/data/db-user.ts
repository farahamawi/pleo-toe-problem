import { query } from '@nc/utils/db';

export function readUser(userId) {
  return query('SELECT * FROM users WHERE id = $1', [userId])
    .then((response) => response.rows?.[0]);
}


export function login(email) {
  return query('SELECT * FROM users WHERE email = $1', [email])
    .then((response) => response.rows?.[0]);
}

