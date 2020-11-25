import React, { forwardRef } from 'react';

import { InputAlternateStyled, InputMaskStyled, InputStyled, LabelStyled, SelectStyled, TextareaStyled } from './FormStyled';

import { Svg } from '../Svg/Svg';

export const Input = forwardRef(({ typeInput = 'text', value = '', ...props }, ref) => {
    const { label, obj } = props;

    return (
        <>
            <InputStyled autoComplete="off" defaultValue={value} obj={obj} ref={ref} type={typeInput} {...props} />

            {label && <LabelStyled aria-label={label}>{label}</LabelStyled>}
        </>
    );
});

export const InputCheckboxRadio = ({ ariaLabel, checked = false, children, id, text, typeInput = 'checkbox', value = '', ...props }) => {
    const { obj } = props;
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <>
            <InputAlternateStyled defaultChecked={checked} defaultValue={value} id={id} obj={obj} type={typeInput} {...props} />

            <Label ariaLabel={acessibility} forLabel={id} {...props}>
                {content}
            </Label>
        </>
    );
};

export const InputFile = ({ ariaLabel, children, id, text, typeInput = 'file', value = '', ...props }) => {
    const { obj } = props;
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <>
            <InputAlternateStyled defaultValue={value} id={id} obj={obj} type={typeInput} {...props} />

            <Label ariaLabel={acessibility} forLabel={id} {...props}>
                {content}
            </Label>
        </>
    );
};

export const InputFileValidation = ({ ariaLabel, children, error = '', id, text, touched, typeInput = 'file', value = '', ...props }) => {
    const { name, obj } = props;
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <>
            <InputAlternateStyled
                defaultValue={value}
                id={id}
                invalid={error}
                obj={obj}
                type={typeInput}
                valid={!error && (value || touched[name]) ? 'true' : undefined}
                {...props}
            />

            <Label ariaLabel={acessibility} forLabel={id} {...props}>
                {content}
            </Label>
        </>
    );
};

export const InputMask = ({ typeInput = 'text', value = '', ...props }) => {
    const { label, obj } = props;

    return (
        <>
            <InputMaskStyled autoComplete="off" defaultValue={value} obj={obj} type={typeInput} {...props} />

            {label && <LabelStyled aria-label={label}>{label}</LabelStyled>}
        </>
    );
};

export const InputMaskValidation = ({ error = '', touched, typeInput = 'text', value = '', ...props }) => {
    const { label, left, name, obj, right } = props;
    const svgPosition = left ? `left: ${left}` : right ? `right: ${right}` : false;

    return (
        <>
            <InputMaskStyled
                autoComplete="off"
                defaultValue={value}
                invalid={error}
                obj={obj}
                type={typeInput}
                valid={!error && (value || touched[name]) ? 'true' : undefined}
                {...props}
            />

            {label && <LabelStyled aria-label={label}>{label}</LabelStyled>}

            <Svg invalid={error} name={error ? 'svg-invalid' : 'svg-valid'} svgPosition={svgPosition} valid={!error && (value || touched[name])} />
        </>
    );
};

export const InputValidation = ({ error = '', touched, typeInput = 'text', value = '', ...props }) => {
    const { label, left, name, obj, right } = props;
    const svgPosition = left ? `left: ${left}` : right ? `right: ${right}` : false;

    return (
        <>
            <InputStyled
                autoComplete="off"
                defaultValue={value}
                invalid={error}
                obj={obj}
                type={typeInput}
                valid={!error && (value || touched[name]) ? 'true' : undefined}
                {...props}
            />

            {label && <LabelStyled aria-label={label}>{label}</LabelStyled>}

            <Svg invalid={error} name={error ? 'svg-invalid' : 'svg-valid'} svgPosition={svgPosition} valid={!error && (value || touched[name])} />
        </>
    );
};

export const Label = ({ ariaLabel, children, forLabel, text, ...props }) => {
    const { obj } = props;
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <LabelStyled aria-label={acessibility} htmlFor={forLabel} obj={obj} {...props}>
            {content}
        </LabelStyled>
    );
};

export const Select = ({ ariaLabel, children, value = '', ...props }) => {
    const { obj } = props;

    return (
        <SelectStyled aria-label={ariaLabel} defaultValue={value} obj={obj} {...props}>
            {children}
        </SelectStyled>
    );
};

export const SelectValidation = forwardRef(({ error = '', children, touched, value = '', ...props }, ref) => {
    const { label, left, name, obj, right } = props;
    const svgPosition = left ? `left: ${left}` : right ? `right: ${right}` : false;

    return (
        <>
            <SelectStyled
                defaultValue={value}
                invalid={error}
                obj={obj}
                ref={ref}
                valid={!error && (value || touched[name]) ? 'true' : undefined}
                {...props}
            >
                {children}
            </SelectStyled>

            {label && <LabelStyled aria-label={label}>{label}</LabelStyled>}

            <Svg invalid={error} name={error ? 'svg-invalid' : 'svg-valid'} svgPosition={svgPosition} valid={!error && (value || touched[name])} />
        </>
    );
});

export const TextareaValidation = ({ error = '', touched, value = '', ...props }) => {
    const { label, name, obj } = props;

    return (
        <>
            <TextareaStyled
                autoComplete="off"
                defaultValue={value}
                invalid={error}
                obj={obj}
                valid={!error && (value || touched[name]) ? 'true' : undefined}
                {...props}
            />

            {label && <LabelStyled aria-label={label}>{label}</LabelStyled>}
        </>
    );
};
