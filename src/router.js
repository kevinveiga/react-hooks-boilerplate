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
            component: (props) => <Cadastro {...props} />,
            label: 'Cadastro',
            path: '/cadastro'
        },
        {
            component: (props) => <Home {...props} />,
            label: 'Home',
            path: '/inicio'
        },
        {
            component: (props) => <Login {...props} />,
            label: 'Login',
            path: '/login'
        },
        {
            component: (props) => <MinhaConta {...props} />,
            isAuth: true,
            label: 'Minha Conta',
            path: '/minha-conta/inicio'
        },
        {
            component: (props) => <MinhaContaCursos {...props} />,
            isAuth: true,
            label: 'Cursos',
            path: '/minha-conta/cursos'
        },
        {
            component: (props) => <Noticia {...props} />,
            label: 'Notícia',
            path: '/noticia/:slug'
        },
        {
            component: (props) => <Noticias {...props} />,
            label: 'Notícias',
            path: '/noticias'
        },
        {
            component: (props) => <Pesquisa {...props} />,
            label: 'Pesquisa',
            path: '/pesquisa/:slug'
        },
        {
            component: (props) => <Home {...props} />,
            label: 'Página não encontrada',
            path: '*'
        }
    ];

    return (
        <Switch>
            {routes.map((route) => (
                <Route exact={route.exact} key={route.path} path={route.path} render={route.component} sensitive={route.sensitive} strict={route.strict} />
            ))}
        </Switch>
    );
});
