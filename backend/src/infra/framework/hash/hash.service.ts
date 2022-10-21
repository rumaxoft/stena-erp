import { pbkdf2, randomBytes } from 'crypto';
import { IHashService } from '@/core/ports/hash/hash.interface';

export class HashService implements IHashService {
  getSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const salt = randomBytes(16).toString('hex');
        resolve(salt);
      } catch (error) {
        reject(error);
      }
    });
  }

  hash(plainTextPassword: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      pbkdf2(
        plainTextPassword,
        salt,
        10000,
        64,
        'sha512',
        (err, derivedkey) => {
          if (err) reject(err);
          resolve(derivedkey.toString('hex'));
        },
      );
    });
  }
}
