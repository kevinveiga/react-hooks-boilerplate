let scrollOnce = false;

const fnScroll = (ancor) => {
    try {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: ancor
        });
    } catch (error) {
        window.scrollTo(0, ancor);
    }

    return null;
};

export const scrollTo = (ancorId = null, isDataLoaded = false, offset = 0, timer = 0) => {
    if (isDataLoaded) {
        // Verifica se o scroll já está sendo feito
        if (!scrollOnce) {
            const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

            let ancor = document.querySelector(ancorId) ? document.querySelector(ancorId).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;
            let scrollTimer = timer;

            // Se o scroll deve ir para um elemento, então é adicionado um timer de 500ms para fazer o scroll corretamente
            if (ancorId && Math.trunc(ancor) !== Math.trunc(scrollYPos)) {
                scrollTimer = 500;
            }

            setTimeout(() => {
                // Busca a posição da âncora novamente depois do timer, para o valor ser correto
                ancor = document.querySelector(ancorId) ? document.querySelector(ancorId).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;

                fnScroll(ancor);
            }, scrollTimer);

            scrollOnce = true;
        }

        // Reseta a verificação se o scroll já estava sendo feito
        setTimeout(() => {
            scrollOnce = false;
        }, 1000);
    }

    return null;
};
