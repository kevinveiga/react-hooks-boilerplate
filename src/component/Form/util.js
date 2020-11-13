import { scrollTo } from '../../util/scrollTo';

export const onFormError = (formError = {}, formId = null, scrollContextString = null) => {
    const inputName = Object.keys(formError).length && Object.keys(formError)[0];

    const anchorElementString =
        (document.getElementsByName(inputName) && `input[name="${inputName}"]`) || (document.querySelector(`#${formId}`) && `#${formId}`);

    scrollTo(anchorElementString, true, -100, 0, scrollContextString);
};
