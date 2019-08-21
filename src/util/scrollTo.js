export const scrollTo = (ancorHash = null, offset = 0) => {
    const ancor = document.querySelector(ancorHash) ? document.querySelector(ancorHash).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;

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
