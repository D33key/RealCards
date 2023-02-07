import React from 'react';
import cl from "./Slider.module.scss";

const SlideImage = ({ src, alt }) => {
    return <img src={src} alt={alt} className={cl.slideImage} />;
};

export default SlideImage;