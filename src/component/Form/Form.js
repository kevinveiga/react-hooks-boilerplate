import React, { forwardRef } from 'react';

import { InputAlternateStyled, InputMaskStyled, InputStyled, LabelStyled, SelectStyled, TextareaStyled } from './FormStyled';

import { Svg } from '../Svg/Svg';

export const Input = forwardRef(({ typeInput = 'text', value = '', ...otherProps }, ref) => {
    return <InputStyled autoComplete="off" defaultValue={value} obj={{ ...otherProps.obj }} type={typeInput} {...otherProps} />;
});

export const InputCheckboxRadio = ({ ariaLabel, checked = false, children, id, text, typeInput = 'checkbox', value, ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <>
            <InputAlternateStyled defaultChecked={checked} defaultValue={value} id={id} type={typeInput} {...otherProps} />

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

export const InputFileValidation = ({ ariaLabel, children, error = '', id, text, touched, typeInput = 'file', value = '', ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <>
            <InputAlternateStyled
                defaultValue={value}
                id={id}
                invalid={error}
                type={typeInput}
                valid={!error && (value || touched[otherProps.name]) ? 'true' : undefined}
                {...otherProps}
            />

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
            <InputStyled
                autoComplete="off"
                defaultValue={value}
                invalid={error}
                obj={{ ...otherProps.obj }}
                type={typeInput}
                valid={!error && (value || touched[otherProps.name]) ? 'true' : undefined}
                {...otherProps}
            />

            {otherProps.label && <LabelStyled aria-label={otherProps.label}>{otherProps.label}</LabelStyled>}

            <Svg
                invalid={error}
                name={error ? 'svg-invalid' : 'svg-valid'}
                svgPosition={svgPosition}
                valid={!error && (value || touched[otherProps.name])}
            />
        </>
    );
};

export const InputMask = ({ typeInput = 'text', value = '', ...otherProps }) => {
    return (
        <>
            <InputMaskStyled autoComplete="off" defaultValue={value} obj={{ ...otherProps.obj }} type={typeInput} {...otherProps} />

            {otherProps.label && <LabelStyled aria-label={otherProps.label}>{otherProps.label}</LabelStyled>}
        </>
    );
};

export const InputMaskValidation = ({ error = '', touched, typeInput = 'text', value = '', ...otherProps }) => {
    const svgPosition = otherProps.left ? `left: ${otherProps.left}` : otherProps.right ? `right: ${otherProps.right}` : false;

    return (
        <>
            <InputMaskStyled
                autoComplete="off"
                defaultValue={value}
                invalid={error}
                obj={{ ...otherProps.obj }}
                type={typeInput}
                valid={!error && (value || touched[otherProps.name]) ? 'true' : undefined}
                {...otherProps}
            />

            {otherProps.label && <LabelStyled aria-label={otherProps.label}>{otherProps.label}</LabelStyled>}

            <Svg
                invalid={error}
                name={error ? 'svg-invalid' : 'svg-valid'}
                svgPosition={svgPosition}
                valid={!error && (value || touched[otherProps.name])}
            />
        </>
    );
};

export const Label = ({ ariaLabel, children, forLabel, text, ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <LabelStyled aria-label={acessibility} htmlFor={forLabel} obj={{ ...otherProps.obj }} {...otherProps}>
            {content}
        </LabelStyled>
    );
};

export const Select = ({ ariaLabel, children, value = '', ...otherProps }) => {
    return (
        <SelectStyled aria-label={ariaLabel} defaultValue={value} obj={{ ...otherProps.obj }} {...otherProps}>
            {children}
        </SelectStyled>
    );
};

export const SelectValidation = forwardRef(({ error = '', children, touched, value = '', ...otherProps }, ref) => {
    const svgPosition = otherProps.left ? `left: ${otherProps.left}` : otherProps.right ? `right: ${otherProps.right}` : false;

    return (
        <>
            <SelectStyled
                defaultValue={value}
                invalid={error}
                obj={{ ...otherProps.obj }}
                ref={ref}
                valid={!error && (value || touched[otherProps.name]) ? 'true' : undefined}
                {...otherProps}
            >
                {children}
            </SelectStyled>

            {otherProps.label && <LabelStyled aria-label={otherProps.label}>{otherProps.label}</LabelStyled>}

            <Svg
                invalid={error}
                name={error ? 'svg-invalid' : 'svg-valid'}
                svgPosition={svgPosition}
                valid={!error && (value || touched[otherProps.name])}
            />
        </>
    );
});

export const TextareaValidation = ({ error = '', touched, value = '', ...otherProps }) => {
    const svgPosition = otherProps.left ? `left: ${otherProps.left}` : otherProps.right ? `right: ${otherProps.right}` : false;

    return (
        <>
            <TextareaStyled
                autoComplete="off"
                defaultValue={value}
                invalid={error}
                obj={{ ...otherProps.obj }}
                valid={!error && (value || touched[otherProps.name]) ? 'true' : undefined}
                {...otherProps}
            />

            {otherProps.label && <LabelStyled aria-label={otherProps.label}>{otherProps.label}</LabelStyled>}
        </>
    );
};
