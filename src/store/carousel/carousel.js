import { useState, useEffect, useCallback } from 'react';

export const useEmblaCarousel = () => {
    const [carousel, setCarousel] = useState(null);
    const [nextBtnEnabled, setToggleNextBtnEnabled] = useState(false);
    const [prevBtnEnabled, setTogglePrevBtnEnabled] = useState(false);
    const [scrollSnaps, setScrollSnaps] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollNext = useCallback(() => carousel.scrollNext(), [carousel]);
    const scrollPrev = useCallback(() => carousel.scrollPrev(), [carousel]);
    const scrollTo = useCallback((index) => carousel.scrollTo(index), [carousel]);

    useEffect(() => {
        const onSelect = () => {
            setTogglePrevBtnEnabled(carousel.canScrollPrev());
            setToggleNextBtnEnabled(carousel.canScrollNext());

            setSelectedIndex(carousel.selectedScrollSnap());
        };

        if (carousel) {
            setScrollSnaps(carousel.scrollSnapList());

            carousel.on('select', onSelect);

            onSelect();
        }

        return () => {
            if (carousel) {
                carousel.destroy();
            }
        };
    }, [carousel]);

    return [carousel, nextBtnEnabled, prevBtnEnabled, setCarousel];
};
