import React, { FC, InputHTMLAttributes } from "react";
import { ErrorMessage, Field } from "formik";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  inputClassName?: string;
  type?: string;
  required?: boolean;
}

//
const InputWithError: FC<Props> = ({
  name,
  placeholder,
  inputClassName,
  required,
  type,
  ...inputProps
}) => {
  return (
    <div>
      <h1 className="text-seasalt mb-1 font-semibold">{placeholder}</h1>
      <Field
        render={({ field }: { field: any }) => (
          <input
            className={[
              "rounded-md p-4 w-full bg-inherit border-gray-400 border-opacity-50 border-2 text-seasalt text-base",
              inputClassName,
            ].join(" ")}
            placeholder={placeholder}
            type={type}
            name={name}
            required={required}
            {...inputProps}
            onChange={(e) => {
              if (typeof inputProps?.onChange?.(e) !== "undefined") {
                inputProps.onChange(e);
              }
              field.onChange(e);
            }}
          />
        )}
      />
      <ErrorMessage
        name={name.toString()}
        className="text-foot mt-3 font-medium leading-5 text-[#E41515]"
        component="div"
      />
    </div>
  );
};

export default InputWithError;
