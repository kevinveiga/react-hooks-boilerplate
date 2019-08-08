import { useEffect, useState } from 'react';
import LazyLoad from 'vanilla-lazyload';

const options = { elements_selector: '.lazyload-img' };

export const useLazyLoad = () => {
    const [stateLazyLoad, setStateLazyLoad] = useState(null);

    useEffect(() => {
        if (!stateLazyLoad) {
            setStateLazyLoad(new LazyLoad(options));
        }

        return () => {
            if (stateLazyLoad) {
                stateLazyLoad.destroy();
            }
        };
    }, [stateLazyLoad]);

    return stateLazyLoad;
};
