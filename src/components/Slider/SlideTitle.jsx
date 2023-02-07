import React from 'react';
import cl from "./Slider.module.scss";
const SlideTitle = ({ title }) => {
    return <div className={cl.slideTitle}>{title}</div>;
};

export default SlideTitle;