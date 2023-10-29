import React, { FC } from "react";

type InputProps = {
  id: string;
  name: string;
  type: string;
  labelText: string;
  className1?: string;
  className2?: string;
  labelClassName?: string;
  inputClassName?: string;
  required?: boolean;
  value?: string;
};

const Input: FC<InputProps> = ({
  id,
  name,
  type,
  labelText,
  className1,
  className2,
  inputClassName,
  labelClassName,
  required,
  value,
}) => {
  return (
    <div className={className1}>
      <label htmlFor={id} className={labelClassName}>
        {labelText}
      </label>
      <div className={className2}>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          className={inputClassName}
          value={value}
        />
      </div>
    </div>
  );
};

export default Input;
