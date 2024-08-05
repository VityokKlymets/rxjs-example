// eslint-disable-next-line import/named
import { InjectionToken, container } from 'tsyringe';

type GenericClass<T> = { new (..._args: any[]): T };

/**
 * Resolve a token into an instance
 *
 * @see {@link https://github.com/Microsoft/tsyringe#resolution}
 *
 * @param token — The dependency token or Class
 * @return — An instance of the dependency
 * @example
 * ´´´tsx
 *  const apiKey = useResolve<string>(API_KEY);
 *  const instance = useResolve(Service);
 * ´´´
 */
export const useResolve = <T>(token: InjectionToken<T> | GenericClass<T>): T => {
  const instance = container.resolve<T>(token);
  return instance;
};
