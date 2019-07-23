export const scrollToTop = () => {
    try {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: 0
        });
    } catch (error) {
        window.scrollTo(0, 0);
    }

    return null;
};
