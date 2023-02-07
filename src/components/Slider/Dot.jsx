import React, { useContext } from 'react';
import { SliderContext } from './Slider';
import cl from "./Slider.module.scss";

const Dot = ({ number }) => {
    const { goToSlide, slideNumber } = useContext(SliderContext);

    return (
        <div
            className={`${cl.dot} ${slideNumber === number ? cl.selected : ""}`}
            onClick={() => goToSlide(number)}
        />
    );
};

export default Dot;