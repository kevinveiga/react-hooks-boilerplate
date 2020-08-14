import { useEffect, useState } from 'react';

const cachedScripts = [];

export const useScriptLoad = (src) => {
    const [stateScriptLoad, setStateScriptLoad] = useState({
        loaded: false,
        error: false
    });

    useEffect(() => {
        if (cachedScripts.includes(src)) {
            setStateScriptLoad({
                loaded: true,
                error: false
            });

            return undefined;
        }

        cachedScripts.push(src);

        const script = document.createElement('script');

        script.src = src;
        script.async = true;

        const onScriptLoad = () => {
            setStateScriptLoad({
                loaded: true,
                error: false
            });
        };

        const onScriptError = () => {
            const index = cachedScripts.indexOf(src);

            if (index > -1) {
                cachedScripts.splice(index, 1);
            }

            script.remove();

            setStateScriptLoad({
                loaded: true,
                error: true
            });
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        document.body.appendChild(script);

        return () => {
            script.removeEventListener('load', onScriptLoad);
            script.removeEventListener('error', onScriptError);
        };
    }, [src]);

    return [stateScriptLoad];
};
