import { Checkbox } from "@material-tailwind/react";
import React, { FC } from "react";
import InputWithError from "../InputWithError";

interface Props {
  name: string;
}

const RememberMe: FC<Props> = ({ name }) => {
  return (
    <div className="flex flex-row gap-x-1 justify-start items-center">
      <input
        name={name}
        className="w-4 h-4 text-lucidean bg-white rounded border-gray-300 checked:text-lucidean"
        type="checkbox"
      />
      {/* <Checkbox color="blue" name={name} /> */}
      <div className="text-black">Remember Me</div>
    </div>
  );
};

export default RememberMe;
