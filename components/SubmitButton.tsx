import React, { FC, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface Props {
  onClick: Function;
  label: string;
}

const SubmitButton: FC<Props> = ({ onClick, label }) => {
  const [isLoading, setIsLoading] = useState(false);
  const clickSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    onClick();
  };

  return (
    <div className="w-full ">
      <button
        type="submit"
        className="bg-lucidean text-seasalt text-lg transition-all duration-300 bg-opacity-100 py-4 w-full hover:bg-opacity-70 rounded-md"
        onClick={() => clickSubmit()}
      >
        {isLoading ? <BeatLoader color="white" loading={isLoading} /> : label}
      </button>
    </div>
  );
};

export default SubmitButton;
