let waitScroll = false;

export const scrollTo = (ancorId = null, isDataLoaded = false, offset = 0) => {
    if (isDataLoaded) {
        if (!waitScroll) {
            const ancor = document.querySelector(ancorId) ? document.querySelector(ancorId).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;

            try {
                window.scroll({
                    behavior: 'smooth',
                    left: 0,
                    top: ancor
                });
            } catch (error) {
                window.scrollTo(0, ancor);
            }

            waitScroll = true;
        }

        setTimeout(() => {
            waitScroll = false;
        }, 1000);
    }

    return null;
};
