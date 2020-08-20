import React, { forwardRef } from 'react';

import { InputAlternateStyled, InputMaskStyled, InputStyled, LabelStyled, SelectStyled } from './FormStyled';

import { Svg } from '../Svg/Svg';

export const Input = ({ typeInput = 'text', value = '', ...otherProps }) => {
    return <InputStyled autoComplete="off" defaultValue={value} obj={{ ...otherProps.obj }} type={typeInput} {...otherProps} />;
};

export const InputCheckboxRadio = ({ ariaLabel, checked = false, children, id, text, typeInput = 'checkbox', value = true, ...otherProps }) => {
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

export const InputMaskValidation = ({ error = '', mask = null, touched, typeInput = 'text', value = '', ...otherProps }) => {
    const svgPosition = otherProps.left ? `left: ${otherProps.left}` : otherProps.right ? `right: ${otherProps.right}` : false;

    return (
        <>
            <InputMaskStyled
                autoComplete="off"
                defaultValue={value}
                invalid={error}
                mask={mask}
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
