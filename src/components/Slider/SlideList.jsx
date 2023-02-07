import React, { useContext } from 'react';
import { SliderContext } from './Slider';
import Slide from "./Slide";
import cl from "./Slider.module.scss";

const SlideList = () => {
    const { slideNumber, items } = useContext(SliderContext);

    return (
        <div
            className={cl.slideList}
            style={{ transform: `translateX(-${slideNumber * 100}%)` }}
        >
            {items.map((slide, index) => (
                <Slide key={index} data={slide} />
            ))}
        </div>
    );
};

export default SlideList;