import { validateToken } from '../packages/utils/jwt';

export default async function authorization (req, res, next) {
  try {
    let jwt = req.headers.authorization;

    // verify request has token
    if (!jwt) {
      return res.status(401).json({ message: 'Invalid token ' });
    }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    // verify token hasn't expired yet
    const decodedToken = await validateToken(jwt);
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Expired token' });
      return;
    }

    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};
