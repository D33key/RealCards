import React, { useContext } from 'react';
import AppContext from '../../context';
import cl from './Info.module.scss';
import { Link } from "react-router-dom";

const Info = ({ title, description, img, isDrawer = true }) => {
    const { setCartOpened } = useContext(AppContext);
    
    
    return (
        <div className={`${cl.emptyWrapper} ${isDrawer ? cl.draw : ''}`}>
            <img className={cl.emptyImg} src={img} alt="Empty Cart" />
            <h2>{title}</h2>
            <p className={cl.text}>{description}</p>
            {isDrawer ? (
                <button
                    className={cl.cancel}
                    onClick={() => setCartOpened(false)}
                >
                    Вернуться назад
                </button>
            ) : (
                <Link className={cl.cancel} to="/">
                    Вернуться назад
                </Link>
            )}
        </div>
    );
};

export default Info;