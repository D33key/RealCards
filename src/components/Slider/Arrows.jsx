import React, { useContext } from 'react';
import { SliderContext } from './Slider';
import cl from "./Slider.module.scss";

const Arrows = () => {
    const { changeSlide } = useContext(SliderContext);

    return (
        <div className={cl.arrows}>
            <div
                className={`${cl.arrow} ${cl.left}`}
                onClick={() => changeSlide(-1)}
            />
            <div
                className={`${cl.arrow} ${cl.right}`}
                onClick={() => changeSlide(1)}
            />
        </div>
    );
};

export default Arrows;