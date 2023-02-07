import React, { createContext, useEffect, useState } from "react";
import Arrows from "./Arrows";
import imagesStub from './images';
import SlidesList from "./SlideList";
import cl from "./Slider.module.scss";

export const SliderContext = createContext();

const Slider = ({ width, height, autoPlay, autoPlayTime }) => {
    const [items, setItems] = useState([]);
    const [slide, setSlide] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);

    useEffect(() => {
        const loadData = () => {
            const images = imagesStub();
            setItems(images);
        };
        loadData();
    }, []);

    const preloadImages = () => {
        const prevItemIndex = slide - 1 < 0 ? items.length - 1 : slide - 1;
        const nextItemIndex = (slide + 1) % items.length;

        new Image().src = items[slide].url;
        new Image().src = items[prevItemIndex].url;
        new Image().src = items[nextItemIndex].url;
    };

    useEffect(() => {
        if (items.length) {
            preloadImages();
        }
    }, [slide, items]);

    const changeSlide = (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = items.length - 1;
        } else {
            slideNumber = (slide + direction) % items.length;
        }

        setSlide(slideNumber);
    };

    const goToSlide = (number) => {
        setSlide(number % items.length);
    };

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;

        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e) => {
        if (touchPosition === null) {
            return;
        }

        const currentPosition = e.touches[0].clientX;
        const direction = touchPosition - currentPosition;

        if (direction > 10) {
            changeSlide(1);
        }

        if (direction < -10) {
            changeSlide(-1);
        }

        setTouchPosition(null);
    };

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            changeSlide(1);
        }, autoPlayTime);

        return () => {
            clearInterval(interval);
        };
    }, [items.length, slide]);

    return (
        <>
            <div
                style={{ width, height }}
                className={cl.slider}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <SliderContext.Provider
                    value={{
                        goToSlide,
                        changeSlide,
                        slidesCount: items.length,
                        slideNumber: slide,
                        items,
                    }}
                >
                    <SlidesList />
                </SliderContext.Provider>
            </div>
        </>
    );
};

Slider.defaultProps = {
    autoPlay: true,
    autoPlayTime: 5000,
    width: "100%",
    height: "100%",
};

export default Slider;
