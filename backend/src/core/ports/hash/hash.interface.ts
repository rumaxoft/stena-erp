export interface IHashService {
  getSalt(): Promise<string>;
  hash(plainTextPassword: string, salt: string): Promise<string>;
}
