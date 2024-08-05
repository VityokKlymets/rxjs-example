import { object, string } from 'yup';
import { FormEventHandler } from 'react';
import { IAuthService } from '../../core/interfaces/IAuthService';
import { useFormValidatorState } from '../../shared/hooks/useFormValidatorState';
import { useResolve } from '../../shared/hooks/useResolve';
import { useRouter } from '@tanstack/react-router';

export const schema = object({
  email: string().email().required(),
  password: string().min(8).max(16).required(),
});

export const useSigninFeature = () => {
  const { errors, $errorsSubject, validate } = useFormValidatorState(schema);
  const service = useResolve('AuthService') as IAuthService;
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const isValid = await validate(data);

    if (isValid) {
      try {
        await service.signin(data);
        router.navigate({ to: '/' });
      } catch (error) {
        $errorsSubject.next(error as Record<string, string>);
      }
    }
  };

  return { handleSubmit, errors };
};
