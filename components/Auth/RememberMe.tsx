import React, { FC } from "react";
import InputWithError from "../InputWithError";

interface Props {
  name: string;
}

const RememberMe: FC<Props> = ({ name }) => {
  return (
    <div className="flex flex-row gap-x-1 justify-start items-center">
      <InputWithError name={name} type="checkbox" />
      {/* <Checkbox color="blue" name={name} /> */}
      <div className="text-black">Remember Me</div>
    </div>
  );
};

export default RememberMe;
