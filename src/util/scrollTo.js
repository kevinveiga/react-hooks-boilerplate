import { sleep } from './sleep';

import { variable } from '../style/variable';

let scrollOnce = false;

const fnElementPosition = (elementPosition) => {
    return elementPosition
        ? elementPosition.getBoundingClientRect().y -
              document.body.getBoundingClientRect().y +
              (window.innerWidth < parseInt(variable.md, 10) ? 0 : 80)
        : 0;
};

const fnScroll = (anchor, context) => {
    try {
        context.scroll({
            behavior: 'smooth',
            left: 0,
            top: anchor
        });
    } catch (error) {
        context.scrollTo(0, anchor);
    }

    return null;
};

export const scrollTo = (anchorElementString = null, doScroll = false, offset = 0, timer = 0, scrollContextString = null) => {
    if (doScroll) {
        // Verifica se o scroll já está sendo feito
        if (!scrollOnce) {
            const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
            const anchorElement = document.querySelector(anchorElementString) || null;
            const scrollContext = document.querySelector(scrollContextString) || window;

            let scrollTimer = parseInt(timer, 10);

            // Se o scroll deve ir para um elemento, então é adicionado um timer de 500ms para fazer o scroll corretamente
            if (anchorElementString && Math.trunc(fnElementPosition(anchorElement)) !== Math.trunc(scrollYPos)) {
                scrollTimer = 500;
            }

            const delay = async () => {
                await sleep(scrollTimer);

                fnScroll(fnElementPosition(anchorElement) + parseInt(offset, 10), scrollContext);
            };

            delay();

            scrollOnce = true;
        }

        // Reseta a verificação se o scroll já estava sendo feito
        const delay = async () => {
            await sleep(1000);

            scrollOnce = false;
        };

        delay();
    }

    return null;
};
