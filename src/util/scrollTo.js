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
};

export const scrollTo = (ancorId = null, isDataLoaded = false, offset = 0) => {
    if (isDataLoaded) {
        // Verifica se o scroll já está sendo feito
        if (!scrollOnce) {
            const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

            let ancor = document.querySelector(ancorId) ? document.querySelector(ancorId).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;
            let timer = 0;

            // Se o scroll deve ir para um elemento, então é adicionado um timer de 1 segundo para fazer o scroll corretamente
            if (ancorId && Math.trunc(ancor) !== Math.trunc(scrollYPos)) {
                timer = 1000;
            }

            setTimeout(() => {
                // Busca a posição da âncora novamente depois do timer, para o valor ser correto
                ancor = document.querySelector(ancorId) ? document.querySelector(ancorId).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;

                fnScroll(ancor);
            }, timer);

            scrollOnce = true;
        }

        // Reseta a verificação se o scroll já estava sendo feito
        setTimeout(() => {
            scrollOnce = false;
        }, 1000);
    }

    return null;
};
