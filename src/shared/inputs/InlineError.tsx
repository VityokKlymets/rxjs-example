import { FC } from "react";

interface IProps {
  error: string;
}

export const InlineError: FC<IProps> = ({ error }) => {
  return <p className="text-sm text-red-600 dark:text-red-500">{error}</p>;
};
