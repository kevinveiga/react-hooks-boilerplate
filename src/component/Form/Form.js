import React from 'react';

import { InputMaskValidationStyled, InputValidationStyled } from './FormStyled';

import { Svg } from '../Svg/Svg';

export const Input = ({ typeInput = 'text', value = '', ...otherProps }) => {
    return <input autoComplete="off" defaultValue={value} obj={{ ...otherProps.obj }} type={typeInput} {...otherProps} />;
};

export const InputValidation = ({ error = '', side, touched, typeInput = 'text', value = '', ...otherProps }) => {
    const svgPosition = otherProps.left ? `left: ${otherProps.left}` : otherProps.right ? `right: ${otherProps.right}` : false;

    return (
        <>
            <InputValidationStyled autoComplete="off" defaultValue={value} invalid={error} obj={{ ...otherProps.obj }} type={typeInput} valid={!error && touched.indexOf(otherProps.name) > -1 ? 'true' : undefined} {...otherProps} />

            <Svg invalid={error} name={error ? 'svg-invalid' : 'svg-valid'} svgPosition={svgPosition} valid={!error && touched.indexOf(otherProps.name) > -1} />
        </>
    );
};

export const InputMaskValidation = ({ error = '', mask = null, touched, typeInput = 'text', value = '', ...otherProps }) => {
    const svgPosition = otherProps.left ? `left: ${otherProps.left}` : otherProps.right ? `right: ${otherProps.right}` : false;

    return (
        <>
            <InputMaskValidationStyled autoComplete="off" defaultValue={value} invalid={error} mask={mask} obj={{ ...otherProps.obj }} type={typeInput} valid={!error && touched.indexOf(otherProps.name) > -1 ? 'true' : undefined} {...otherProps} />

            <Svg invalid={error} name={error ? 'svg-invalid' : 'svg-valid'} svgPosition={svgPosition} valid={!error && touched.indexOf(otherProps.name) > -1} />
        </>
    );
};

export const Label = ({ ariaLabel, children, forLabel, text, ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <label aria-label={acessibility} htmlFor={forLabel} {...otherProps}>
            {content}
        </label>
    );
};
