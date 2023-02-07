import React from 'react';
import { Link } from 'react-router-dom';

const E404 = () => {
    return (
        <div>
            <h1>Упс, кажется, такой страницы нет.</h1>
            <Link to='/' className='confirm'>Вернуться на главную</Link>
        </div>
    );
};

export default E404;