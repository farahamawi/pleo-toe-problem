import { format } from './formatter';
import { getUserExpenses } from './data/db-expense';
import { to } from '@nc/utils/async';
import { Expense } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getExpenses(userId, page, orderBy, sort): Promise<Expense[]> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpenses] = await to(getUserExpenses(userId, page, orderBy, sort));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses) {
    throw NotFound(`Could not find expenses for user with id ${userId}`);
  }
  return format(rawExpenses);
}
