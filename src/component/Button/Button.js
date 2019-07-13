import React from 'react';

import './Button.scss';

export const Button = ({ ariaLabel = '', children, text = '', typeButton = 'button', ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <button aria-label={acessibility} type={typeButton} {...otherProps}>
            {content}
        </button>
    );
};
