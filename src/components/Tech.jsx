import React from "react";
import { BallCanvas } from "./canvas";
import { technologies } from "../Home";

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10 mt-0">
      {technologies.map((technology) => (
        <div className="w-28 h-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default Tech;
