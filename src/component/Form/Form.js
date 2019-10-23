import React from 'react';

import { InputAlternateStyled, InputMaskStyled, InputStyled, LabelStyled, SelectStyled } from './FormStyled';

import { Svg } from '../Svg/Svg';

export const Input = ({ typeInput = 'text', value = '', ...otherProps }) => {
    return <InputStyled autoComplete="off" defaultValue={value} obj={{ ...otherProps.obj }} type={typeInput} {...otherProps} />;
};

export const InputCheckboxRadio = ({ ariaLabel, children, id, text, typeInput = 'checkbox', value = '', ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <>
            <InputAlternateStyled defaultValue={value} id={id} type={typeInput} {...otherProps} />

            <Label ariaLabel={acessibility} forLabel={id} {...otherProps}>
                {content}
            </Label>
        </>
    );
};

export const InputFile = ({ ariaLabel, children, id, text, typeInput = 'file', value = '', ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <>
            <InputAlternateStyled defaultValue={value} id={id} type={typeInput} {...otherProps} />

            <Label ariaLabel={acessibility} forLabel={id} {...otherProps}>
                {content}
            </Label>
        </>
    );
};

export const InputValidation = ({ error = '', touched, typeInput = 'text', value = '', ...otherProps }) => {
    const svgPosition = otherProps.left ? `left: ${otherProps.left}` : otherProps.right ? `right: ${otherProps.right}` : false;

    return (
        <>
            <InputStyled autoComplete="off" defaultValue={value} invalid={error} obj={{ ...otherProps.obj }} type={typeInput} valid={!error && touched.indexOf(otherProps.name) > -1 ? 'true' : undefined} {...otherProps} />

            {otherProps.label && <LabelStyled aria-label={otherProps.label}>{otherProps.label}</LabelStyled>}

            <Svg invalid={error} name={error ? 'svg-invalid' : 'svg-valid'} svgPosition={svgPosition} valid={!error && touched.indexOf(otherProps.name) > -1} />
        </>
    );
};

export const InputMaskValidation = ({ error = '', mask = null, touched, typeInput = 'text', value = '', ...otherProps }) => {
    const svgPosition = otherProps.left ? `left: ${otherProps.left}` : otherProps.right ? `right: ${otherProps.right}` : false;

    return (
        <>
            <InputMaskStyled autoComplete="off" defaultValue={value} invalid={error} mask={mask} obj={{ ...otherProps.obj }} type={typeInput} valid={!error && touched.indexOf(otherProps.name) > -1 ? 'true' : undefined} {...otherProps} />

            {otherProps.label && <LabelStyled aria-label={otherProps.label}>{otherProps.label}</LabelStyled>}

            <Svg invalid={error} name={error ? 'svg-invalid' : 'svg-valid'} svgPosition={svgPosition} valid={!error && touched.indexOf(otherProps.name) > -1} />
        </>
    );
};

export const Label = ({ ariaLabel, children, forLabel, text, ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <LabelStyled aria-label={acessibility} htmlFor={forLabel} {...otherProps}>
            {content}
        </LabelStyled>
    );
};

export const Select = ({ ariaLabel, children, value = '', ...otherProps }) => {
    return (
        <SelectStyled aria-label={ariaLabel} defaultValue={value} {...otherProps}>
            {children}
        </SelectStyled>
    );
};
