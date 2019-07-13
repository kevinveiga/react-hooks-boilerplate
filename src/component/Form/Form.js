import React, { Fragment, forwardRef } from 'react';

import { Svg } from '../Svg/Svg';

export const Input = forwardRef(({ classNameInput = 'custom-input', classNameValidate = 'icon-right', error = '', touched, typeInput = 'text', value = '', ...otherProps }, ref) => {
    return (
        <Fragment>
            <input autoComplete="off" className={`${classNameInput} ${error ? 'invalid' : `${touched.find((item) => item === otherProps.name) ? 'valid' : ''}`}`} defaultValue={value} ref={ref} type={typeInput} {...otherProps} />

            <Svg className={`${classNameValidate} ${error ? 'svg-invalid' : 'svg-valid'}`} name={error ? 'svg-invalid' : 'svg-valid'} />
        </Fragment>
    );
});

export const Label = ({ children, classNameInput = 'custom-label', forLabel, textLabel, ...otherProps }) => {
    const content = children || textLabel;

    return (
        <label className={classNameInput} htmlFor={forLabel} {...otherProps}>
            {content}
        </label>
    );
};
