import { FC, HTMLInputTypeAttribute } from "react";

interface IProps {
  error?: boolean;
  type: HTMLInputTypeAttribute;
  name: string;
}

const inputClass = "block w-full rounded-md shadow-sm";
const inputErrorClass =
  "block w-full rounded-md shadow-sm border-red-500 text-red-900 placeholder-red-700";

export const TextInput: FC<IProps> = ({ type, name, error = false }) => {
  return <input name={name} className={error ? inputErrorClass : inputClass} type={type}></input>;
};
