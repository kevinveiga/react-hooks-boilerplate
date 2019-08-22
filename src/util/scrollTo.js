let wait = false;

export const scrollTo = (ancorId = null, isDataLoaded = false, offset = 0) => {
    const ancor = document.querySelector(ancorId) ? document.querySelector(ancorId).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;

    if (isDataLoaded) {
        if (!wait) {
            try {
                window.scroll({
                    behavior: 'smooth',
                    left: 0,
                    top: ancor
                });
            } catch (error) {
                window.scrollTo(0, ancor);
            }

            wait = true;
        }

        setTimeout(() => {
            wait = false;
        }, 1000);
    }

    return null;
};
