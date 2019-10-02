import React, { useContext, useEffect } from 'react';
import { matchPath, Route, Switch } from 'react-router-dom';

import { Context } from './store/context';

import { Cadastro } from './component/Page/Cadastro/Cadastro';
import { Contato } from './component/Page/Contato/Contato';
import { Home } from './component/Page/Home/Home';
import { MinhaConta } from './component/Page/MinhaConta/MinhaConta';
import { Noticia } from './component/Page/Noticia/Noticia';
import { Noticias } from './component/Page/Noticia/Noticias';
import { Pesquisa } from './component/Page/Pesquisa/Pesquisa';

export const Router = () => {
    // CONTEXT
    const { setStateHideFooterGlobal, setStateHideHeaderGlobal } = useContext(Context);

    // ACTION
    // Oculta Header e Footer padrões do site de acordo com Array de path
    useEffect(() => {
        if (
            matchPath(window.location.pathname, {
                path: ['/cadastro', '/minha-conta']
            })
        ) {
            setStateHideFooterGlobal(true);
            setStateHideHeaderGlobal(true);
        } else {
            setStateHideFooterGlobal(false);
            setStateHideHeaderGlobal(false);
        }
    }, [setStateHideFooterGlobal, setStateHideHeaderGlobal]);

    return (
        <Switch>
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/inicio" component={Home} />
            <Route path="/contato" component={Contato} />
            <Route path="/minha-conta" component={MinhaConta} />
            <Route path="/noticia/:slug" component={Noticia} />
            <Route path="/noticias" component={Noticias} />
            <Route path="/pesquisa/:slug" component={Pesquisa} />
            <Route path="*" component={Home} />
        </Switch>
    );
};
