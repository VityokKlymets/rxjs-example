import { Button } from '@radix-ui/themes';
import { FC } from 'react';
import { InlineError } from '../../shared/inputs/InlineError';
import { TextInput } from '../../shared/inputs/TextInput';
import { useSigninFeature } from '../../features/signin/signin';

export const Signin: FC = () => {
  const { handleSubmit, errors } = useSigninFeature();

  return (
    <div className="container mx-auto px-2">
      <h3 className="p-2 text-center">Sign in</h3>
      <form onSubmit={handleSubmit} className="mt-5 md:max-w-lg mx-auto grid grid-cols-1 gap-1">
        <label className="block">
          <span className="text-gray-700">Email address</span>
        </label>
        <TextInput error={!!errors.email} type="text" name="email"></TextInput>
        <InlineError error={errors.email}></InlineError>
        <label className="block">
          <span className="text-gray-700">Password</span>
        </label>
        <TextInput error={!!errors.password} type="password" name="password"></TextInput>
        <InlineError error={errors.password}></InlineError>

        <Button mt={'2'} type="submit" size={'3'}>
          Signin
        </Button>
      </form>
    </div>
  );
};
