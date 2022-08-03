import { query, limit } from '@nc/utils/db';

export function getUserExpenses(userId, page=1, orderBy="date_created", sort='desc') {
  var offset = limit * (page - 1);
   var _query = `SELECT * FROM expenses WHERE user_id = '${userId}' ORDER BY ${orderBy} ${sort.toUpperCase()} limit ${limit} offset ${offset};`;
  return query(_query)
    .then((response) => response.rows);
}
