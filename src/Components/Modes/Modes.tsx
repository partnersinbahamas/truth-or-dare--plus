import React from "react";
import  Mode  from '../Mode/ModeIndex'
import { modes } from "../Helpers/Variables";
import './Modes.scss';

export const Modes = () => {
  console.log(modes);
  return (
    <section className="modes">
      <div className="modes__wrapper">
        {modes.map((mode) => (
          <Mode key={mode.id} mode={mode}/>
        ))}
      </div>
    </section>
  )
}