import { sleep } from './sleep';

let scrollOnce = false;

const fnScroll = (anchor) => {
    try {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: anchor
        });
    } catch (error) {
        window.scrollTo(0, anchor);
    }

    return null;
};

export const scrollTo = (anchorId = null, doScroll = false, offset = 0, timer = 0) => {
    if (doScroll) {
        // Verifica se o scroll já está sendo feito
        if (!scrollOnce) {
            const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
            const element = document.querySelector(anchorId) || null;

            let anchor = element ? element.getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;
            let scrollTimer = timer;

            // Se o scroll deve ir para um elemento, então é adicionado um timer de 500ms para fazer o scroll corretamente
            if (anchorId && Math.trunc(anchor) !== Math.trunc(scrollYPos)) {
                scrollTimer = 500;
            }

            const delay = async () => {
                await sleep(parseInt(scrollTimer, 10));

                // Busca a posição da âncora novamente depois do timer, para o valor ser correto
                anchor = element ? element.getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;

                fnScroll(anchor);
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
