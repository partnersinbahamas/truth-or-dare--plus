import React from "react";
import { modes } from "../Helpers/Variables";
import  Mode  from '../Mode/ModeIndex'
import './Modes.scss';

export const Modes = () => {
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