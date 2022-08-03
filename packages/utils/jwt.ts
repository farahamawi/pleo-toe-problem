import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

/**
 * generates JWT used for local testing
 */
export function generateToken(email, userId) {
  // information to be encoded in the JWT
  const payload = {
    email,
    userId
  };
  const expires_in = '10m';
  // read private key value
  const privateKey = fs.readFileSync(path.join(__dirname, '../../certs/private.key'));

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key 
    // to generate the JWT. The client gets a public key to validate the 
    // signature
    algorithm: 'RS256',
    expiresIn: expires_in
  };

  // generate JWT
  const access_token = sign(payload, privateKey, signInOptions);
  return ({
      access_token,
      expires_in,
      token_type: 'Bearer'

  })
};

interface TokenPayload {
  exp: number;
  name: string;
  userId: number;
}

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export function validateToken(token: string): Promise<TokenPayload> {
  const publicKey = fs.readFileSync(path.join(__dirname, '../../certs/public.key'));

  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256'],
  };

  return new Promise((resolve, reject) => {
    verify(token, publicKey, verifyOptions, (error, decoded: TokenPayload) => {
      if (error) return reject(error);

      resolve(decoded);
    })
  });
}