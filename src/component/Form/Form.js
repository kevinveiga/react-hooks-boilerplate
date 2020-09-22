import React, { forwardRef } from 'react';

import { InputAlternateStyled, InputMaskStyled, InputStyled, LabelStyled, SelectStyled, TextareaStyled } from './FormStyled';

import { Svg } from '../Svg/Svg';

export const Input = forwardRef(({ typeInput = 'text', value = '', ...props }, ref) => {
    return <InputStyled autoComplete="off" defaultValue={value} obj={{ ...props.obj }} type={typeInput} {...props} />;
});

export const InputCheckboxRadio = ({ ariaLabel, checked = false, children, id, text, typeInput = 'checkbox', value, ...props }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <>
            <InputAlternateStyled defaultChecked={checked} defaultValue={value} id={id} type={typeInput} {...props} />

            <Label ariaLabel={acessibility} forLabel={id} {...props}>
                {content}
            </Label>
        </>
    );
};

export const InputFile = ({ ariaLabel, children, id, text, typeInput = 'file', value = '', ...props }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <>
            <InputAlternateStyled defaultValue={value} id={id} type={typeInput} {...props} />

            <Label ariaLabel={acessibility} forLabel={id} {...props}>
                {content}
            </Label>
        </>
    );
};

export const InputFileValidation = ({ ariaLabel, children, error = '', id, text, touched, typeInput = 'file', value = '', ...props }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <>
            <InputAlternateStyled
                defaultValue={value}
                id={id}
                invalid={error}
                type={typeInput}
                valid={!error && (value || touched[props.name]) ? 'true' : undefined}
                {...props}
            />

            <Label ariaLabel={acessibility} forLabel={id} {...props}>
                {content}
            </Label>
        </>
    );
};

export const InputValidation = ({ error = '', touched, typeInput = 'text', value = '', ...props }) => {
    const svgPosition = props.left ? `left: ${props.left}` : props.right ? `right: ${props.right}` : false;

    return (
        <>
            <InputStyled
                autoComplete="off"
                defaultValue={value}
                invalid={error}
                obj={{ ...props.obj }}
                type={typeInput}
                valid={!error && (value || touched[props.name]) ? 'true' : undefined}
                {...props}
            />

            {props.label && <LabelStyled aria-label={props.label}>{props.label}</LabelStyled>}

            <Svg
                invalid={error}
                name={error ? 'svg-invalid' : 'svg-valid'}
                svgPosition={svgPosition}
                valid={!error && (value || touched[props.name])}
            />
        </>
    );
};

export const InputMask = ({ typeInput = 'text', value = '', ...props }) => {
    return (
        <>
            <InputMaskStyled autoComplete="off" defaultValue={value} obj={{ ...props.obj }} type={typeInput} {...props} />

            {props.label && <LabelStyled aria-label={props.label}>{props.label}</LabelStyled>}
        </>
    );
};

export const InputMaskValidation = ({ error = '', touched, typeInput = 'text', value = '', ...props }) => {
    const svgPosition = props.left ? `left: ${props.left}` : props.right ? `right: ${props.right}` : false;

    return (
        <>
            <InputMaskStyled
                autoComplete="off"
                defaultValue={value}
                invalid={error}
                obj={{ ...props.obj }}
                type={typeInput}
                valid={!error && (value || touched[props.name]) ? 'true' : undefined}
                {...props}
            />

            {props.label && <LabelStyled aria-label={props.label}>{props.label}</LabelStyled>}

            <Svg
                invalid={error}
                name={error ? 'svg-invalid' : 'svg-valid'}
                svgPosition={svgPosition}
                valid={!error && (value || touched[props.name])}
            />
        </>
    );
};

export const Label = ({ ariaLabel, children, forLabel, text, ...props }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <LabelStyled aria-label={acessibility} htmlFor={forLabel} obj={{ ...props.obj }} {...props}>
            {content}
        </LabelStyled>
    );
};

export const Select = ({ ariaLabel, children, value = '', ...props }) => {
    return (
        <SelectStyled aria-label={ariaLabel} defaultValue={value} obj={{ ...props.obj }} {...props}>
            {children}
        </SelectStyled>
    );
};

export const SelectValidation = forwardRef(({ error = '', children, touched, value = '', ...props }, ref) => {
    const svgPosition = props.left ? `left: ${props.left}` : props.right ? `right: ${props.right}` : false;

    return (
        <>
            <SelectStyled
                defaultValue={value}
                invalid={error}
                obj={{ ...props.obj }}
                ref={ref}
                valid={!error && (value || touched[props.name]) ? 'true' : undefined}
                {...props}
            >
                {children}
            </SelectStyled>

            {props.label && <LabelStyled aria-label={props.label}>{props.label}</LabelStyled>}

            <Svg
                invalid={error}
                name={error ? 'svg-invalid' : 'svg-valid'}
                svgPosition={svgPosition}
                valid={!error && (value || touched[props.name])}
            />
        </>
    );
});

export const TextareaValidation = ({ error = '', touched, value = '', ...props }) => {
    const svgPosition = props.left ? `left: ${props.left}` : props.right ? `right: ${props.right}` : false;

    return (
        <>
            <TextareaStyled
                autoComplete="off"
                defaultValue={value}
                invalid={error}
                obj={{ ...props.obj }}
                valid={!error && (value || touched[props.name]) ? 'true' : undefined}
                {...props}
            />

            {props.label && <LabelStyled aria-label={props.label}>{props.label}</LabelStyled>}
        </>
    );
};
