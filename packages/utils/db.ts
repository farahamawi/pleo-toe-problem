import { Client } from 'pg';
import config from 'config';

let db;
export const limit = 10;
export function connect() {
  db = new Client(config.db);
  return db.connect();
}

export async function query(queryString: string, parameters?: any) {
  if (!db) await connect();

  return db.query(queryString, parameters);
}
