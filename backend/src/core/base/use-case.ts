import { Result } from '@/shared/helpers/result-monad';
export interface UseCase<TModel, E> {
  execute(...args: any[]): Promise<Result<TModel, E>>;
}
