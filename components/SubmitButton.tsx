import React, { FC } from "react";

interface Props {
  onClick: Function;
  label: string;
}

const SubmitButton: FC<Props> = ({ onClick, label }) => {
  return (
    <div className="w-full ">
      <button
        type="submit"
        className="bg-lucidean text-lg transition-all duration-300 bg-opacity-100 py-4 w-full hover:bg-opacity-70 rounded-md"
        onClick={() => onClick()}
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
