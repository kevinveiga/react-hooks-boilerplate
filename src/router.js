import React, { useContext, useEffect } from 'react';
import { matchPath, Route, Switch, withRouter } from 'react-router-dom';

import { Context } from './store/context';

import { Cadastro } from './component/Page/Cadastro/Cadastro';
import { Home } from './component/Page/Home/Home';
import { Login } from './component/Page/Login/Login';
import { MinhaConta } from './component/Page/MinhaConta/MinhaConta';
import { MinhaContaCursos } from './component/Page/MinhaConta/MinhaContaCursos';
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

    // ROUTES
    const routes = [
        {
            component: () => <Cadastro />,
            label: 'Cadastro',
            path: '/cadastro'
        },
        {
            component: () => <Home />,
            label: 'Home',
            path: '/inicio'
        },
        {
            component: () => <Login />,
            label: 'Login',
            path: '/login'
        },
        {
            component: () => <MinhaConta />,
            label: 'Minha Conta',
            path: '/minha-conta/inicio'
        },
        {
            component: () => <MinhaContaCursos />,
            label: 'Cursos',
            path: '/minha-conta/cursos'
        },
        {
            component: () => <Noticia />,
            label: 'Notícia',
            path: '/noticia/:slug'
        },
        {
            component: () => <Noticias />,
            label: 'Notícias',
            path: '/noticias'
        },
        {
            component: () => <Pesquisa />,
            label: 'Pesquisa',
            path: '/pesquisa/:slug'
        },
        {
            component: () => <Home />,
            label: 'Página não encontrada',
            path: '*'
        }
    ];

    return (
        <Switch>
            {routes.map((routes) => (
                <Route component={routes.component} label={routes.label} key={routes.path} path={routes.path} />
            ))}
        </Switch>
    );
});
