import 'reflect-metadata';
import { FC, PropsWithChildren, useEffect } from 'react';
import { RouterProvider, createRouter, useRouter } from '@tanstack/react-router';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthServiceMock } from '../../core/services/AuthService/AuthServiceMock';
import { IAuthService } from '../../core/interfaces/IAuthService';
import { User } from '../../core/models/user';
import { container as diContainer } from 'tsyringe';
import { routeTree } from '../../routeTree.gen';

const InitialNavigation: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    router.navigate({ to: '/signin' });
  }, [router]);

  return children;
};

const router = createRouter({ routeTree, InnerWrap: InitialNavigation });

const setup = async (serviceClass: any) => {
  diContainer.register('AuthService', serviceClass);
  const { container } = await render(<RouterProvider router={router}></RouterProvider>);
  await waitFor(() => expect(window.location.href).toContain('/signin'));

  await waitFor(() => {
    expect(screen.getByText('Sign in')).not.toBeNull();
  });

  const submitBtn = container.querySelector(`button[type="submit"]`) as HTMLButtonElement;
  const emailInput = container.querySelector(`input[name="email"]`) as HTMLInputElement;
  const passwordInput = container.querySelector(`input[name="password"]`) as HTMLInputElement;

  return {
    container,
    submitBtn,
    emailInput,
    passwordInput,
  };
};

describe('Signin page tests', () => {
  afterEach(() => {
    cleanup();
    diContainer.clearInstances();
  });

  it('renders the Signin component', async () => {
    await setup(AuthServiceMock);
    render(<RouterProvider router={router}></RouterProvider>);
  });

  it('shows signin form validation messages', async () => {
    const { submitBtn } = await setup(AuthServiceMock);
    await waitFor(() => fireEvent.click(submitBtn));

    await waitFor(() => {
      expect(screen.getByText('password is a required field')).not.toBeNull();
      expect(screen.getByText('email is a required field')).not.toBeNull();
    });
  });

  it('handles signin errors response', async () => {
    class AuthServiceError implements IAuthService {
      public async signin(_data: FormData): Promise<User> {
        return new Promise((_resolve, reject) => {
          reject({ email: 'this email is already taken' });
        });
      }
    }
    const { submitBtn, emailInput, passwordInput } = await setup(AuthServiceError);

    await waitFor(() => fireEvent.change(emailInput, { target: { value: 'test@email.com' } }));
    await waitFor(() => fireEvent.change(passwordInput, { target: { value: '1234554321' } }));

    await waitFor(() => fireEvent.click(submitBtn));

    await waitFor(() => {
      expect(screen.getByText('this email is already taken')).not.toBeNull();
    });
  });

  it('successfully redirects to home page ', async () => {
    const { submitBtn, emailInput, passwordInput } = await setup(AuthServiceMock);

    await waitFor(() => fireEvent.change(emailInput, { target: { value: 'test@email.com' } }));
    await waitFor(() => fireEvent.change(passwordInput, { target: { value: '1234554321' } }));

    await waitFor(() => fireEvent.click(submitBtn));
  });
});
