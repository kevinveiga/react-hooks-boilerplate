import React, { useContext, useEffect } from 'react';
import { matchPath, Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { Context } from './store/context';

import { Cadastro } from './component/Page/Cadastro/Cadastro';
import { Home } from './component/Page/Home/Home';
import { Login } from './component/Page/Login/Login';
import { MinhaConta } from './component/Page/MinhaConta/MinhaConta';
import { MinhaContaCurso } from './component/Page/MinhaConta/MinhaContaCurso';
import { MinhaContaCursos } from './component/Page/MinhaConta/MinhaContaCursos';
import { Noticia } from './component/Page/Noticia/Noticia';
import { Noticias } from './component/Page/Noticia/Noticias';
import { Pesquisa } from './component/Page/Pesquisa/Pesquisa';

const PrivateRoute = ({ breadcrumb, component: Component, ...otherProps }) => {
    // CONTEXT
    const { stateAuthTokenGlobal } = useContext(Context);

    return <Route render={(props) => (stateAuthTokenGlobal ? <Component breadcrumb={breadcrumb} {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)} {...otherProps} />;
};

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

            <PrivateRoute component={MinhaConta} isAuth={true} path={minhaContaInicioRoute.path} />
            <PrivateRoute breadcrumb={[minhaContaInicioRoute, { label: 'Cursos', path: '/minha-conta/cursos' }]} component={MinhaContaCurso} isAuth={true} path="/minha-conta/curso/:slug" />
            <PrivateRoute breadcrumb={[minhaContaInicioRoute]} component={MinhaContaCursos} isAuth={true} path="/minha-conta/cursos" />

            <Route component={MinhaConta} exact={true} isAuth={true} path="/minha-conta">
                <Redirect to={minhaContaInicioRoute.path} />
            </Route>
            <Route component={MinhaConta} isAuth={true} path="/minha-conta/*">
                <Redirect to={minhaContaInicioRoute.path} />
            </Route>

            <Route component={Noticia} path="/noticia/:slug" />
            <Route component={Noticias} path="/noticias" />
            <Route component={Pesquisa} path="/pesquisa/:slug" />
            <Route component={Home} path="*" />
        </Switch>
    );
});
