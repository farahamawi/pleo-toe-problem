import { ApiError } from '@nc/utils/errors';
import { getExpenses } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import authorization from '../../../../middleware/authorization';

export const router = Router();
//  GET user expenses
router
  .route('/user_id/:user_id')
  .get(authorization, async (req, res, next) => {

  const { user_id } = req.params;
  const [expensesError, expensesDetails] = await to(getExpenses(user_id, req.query?.page, req.query?.order_by, req.query?.sort));

  if (expensesError) {
    return next(new ApiError(expensesError, expensesError.status, `Could not get user details: ${expensesError}`, expensesError.title, req));
  }

  if (!expensesDetails) {
    return res.json({});
  }
  return res.json(expensesDetails);
});
