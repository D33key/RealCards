import React from 'react';
import SlideImage from './SlideImage'
import SlideTitle from "./SlideTitle";
import cl from "./Slider.module.scss";


const Slide = ({ data: { url, title = 'VideoCards' } }) => {
    return (
        <div className={cl.slide}>
            <SlideImage src={url} alt={"VideoCards"} />
            <SlideTitle title={title} />
        </div>
    );
};

export default Slide;