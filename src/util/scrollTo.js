export const scrollTo = (ancorHash = null, isDataLoaded = false, offset = 0) => {
    const ancor = document.querySelector(ancorHash) ? document.querySelector(ancorHash).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;

    if (isDataLoaded) {
        try {
            window.scroll({
                behavior: 'smooth',
                left: 0,
                top: ancor
            });
        } catch (error) {
            window.scrollTo(0, ancor);
        }
    }

    return null;
};
