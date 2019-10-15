import React, { useContext, useEffect } from 'react';
import { matchPath, Route, Switch, withRouter } from 'react-router-dom';

import { Context } from './store/context';

import { Cadastro } from './component/Page/Cadastro/Cadastro';
import { Home } from './component/Page/Home/Home';
import { Login } from './component/Page/Login/Login';
import { MinhaConta } from './component/Page/MinhaConta/MinhaConta';
import { MinhaContaCurso } from './component/Page/MinhaConta/MinhaContaCurso';
import { Noticia } from './component/Page/Noticia/Noticia';
import { Noticias } from './component/Page/Noticia/Noticias';
import { Pesquisa } from './component/Page/Pesquisa/Pesquisa';

export const Router = withRouter((props) => {
    // CONTEXT
    const { setStateHideFooterGlobal, setStateHideHeaderGlobal } = useContext(Context);

    // ACTION
    // Oculta Header e Footer padrões do site de acordo com array do path
    useEffect(() => {
        if (
            matchPath(window.location.pathname, {
                path: ['/cadastro', '/login', '/minha-conta']
            })
        ) {
            setStateHideFooterGlobal(true);
            setStateHideHeaderGlobal(true);
        } else {
            setStateHideFooterGlobal(false);
            setStateHideHeaderGlobal(false);
        }
    }, [props, setStateHideFooterGlobal, setStateHideHeaderGlobal]);

    const minhaContaInicioRoute = { label: 'Minha Conta', path: '/minha-conta/inicio' };

    return (
        <Switch>
            <Route component={Cadastro} path="/cadastro" />
            <Route component={Home} path="/inicio" />
            <Route component={Login} path="/login" />
            <Route component={MinhaConta} isAuth={true} path={minhaContaInicioRoute.path} />
            <Route isAuth={true} path="/minha-conta/curso/:slug" render={(props) => <MinhaContaCurso breadcrumb={[minhaContaInicioRoute, { label: 'Cursos', path: '/minha-conta/cursos' }]} {...props} />} />
            <Route component={Noticia} path="/noticia/:slug" />
            <Route component={Noticias} path="/noticias" />
            <Route component={Pesquisa} path="/pesquisa/:slug" />
            <Route component={Home} path="*" />
        </Switch>
    );
});
