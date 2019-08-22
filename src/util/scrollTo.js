let wait = false;

export const scrollTo = (ancorHash = null, isDataLoaded = false, offset = 0) => {
    const ancor = document.querySelector(ancorHash) ? document.querySelector(ancorHash).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;

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
        }, 2000);
    }

    return null;
};
