import { ObjectSchema, ValidationError } from 'yup';
import { BehaviorSubject } from 'rxjs';
import { useObservableState } from 'observable-hooks';

const $errorsSubject = new BehaviorSubject({});

export const transformYupErrorsIntoObject = (errors: ValidationError): Record<string, string> => {
  const validationErrors: Record<string, string> = {};

  errors.inner.forEach((error: any) => {
    if (error.path !== undefined) {
      validationErrors[error.path] = error.errors[0];
    }
  });

  return validationErrors;
};

export const useFormValidatorState = (schema: ObjectSchema<any>) => {
  const errors = useObservableState<Record<string, string>>($errorsSubject);

  const validate = async (data: FormData) => {
    try {
      await schema.validate(Object.fromEntries(data), { abortEarly: false });
      $errorsSubject.next({});
      return true;
    } catch (errors) {
      $errorsSubject.next(transformYupErrorsIntoObject(errors as ValidationError));
      return false;
    }
  };

  return { errors, validate, $errorsSubject };
};
