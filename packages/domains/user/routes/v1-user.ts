import { ApiError } from '@nc/utils/errors';
import { getUserDetails, authenticate } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import authorization from '../../../../middleware/authorization';

export const router = Router();
//  GET user details
router
  .route('/user_id/:user_id')
  .get(authorization, async (req, res, next) => {
  const { user_id } = req.params;
  const [userError, userDetails] = await to(getUserDetails(user_id));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  return res.json(userDetails);
});

// POST login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const [userError, userDetails] = await to(authenticate(email, password));

  if (userError) {
    return next(new ApiError(userError, userError.status, 'Invalid username or password', userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  return res.json(userDetails);
});
