import React, { lazy, Suspense, useContext, useEffect } from 'react';

import { matchPath, Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { Context } from './store/context';

import { Aprenda } from './component/Page/Aprenda/Aprenda';
import { Cadastro } from './component/Page/Cadastro/Cadastro';
import { Curso } from './component/Page/Curso/Curso';
import { LoaderComponent, LoaderComponentError } from './component/Loader/LoaderComponent';
import { EsqueceuSenha } from './component/Page/Login/EsqueceuSenha';
import { Home } from './component/Page/Home/Home';
import { Login } from './component/Page/Login/Login';
import { Noticia } from './component/Page/Noticia/Noticia';
import { Noticias } from './component/Page/Noticia/Noticias';
import { Pesquisa } from './component/Page/Pesquisa/Pesquisa';

// LAZY
const MinhaConta = lazy(() => import('./component/Page/MinhaConta/MinhaConta'));
const MinhaContaCurso = lazy(() => import('./component/Page/MinhaConta/MinhaContaCurso'));
const MinhaContaCursos = lazy(() => import('./component/Page/MinhaConta/MinhaContaCursos'));

const PrivateRoute = ({ breadcrumb, component: Component, ...otherProps }) => {
    // CONTEXT
    const { stateAuthTokenContext } = useContext(Context);

    return (
        <LoaderComponentError>
            <Suspense fallback={LoaderComponent()}>
                <Route
                    render={(props) => (stateAuthTokenContext ? <Component breadcrumb={breadcrumb} {...props} /> : <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />)}
                    {...otherProps}
                />
            </Suspense>
        </LoaderComponentError>
    );
};

export const Router = withRouter((props) => {
    // CONTEXT
    const { setStateHideFooterContext, setStateHideHeaderContext } = useContext(Context);

    // ACTION
    // Oculta Header e Footer padrões do site de acordo com array do path
    useEffect(() => {
        if (
            matchPath(window.location.pathname, {
                path: ['/cadastro', '/esqueceu-senha', '/login', '/minha-conta']
            })
        ) {
            setStateHideFooterContext(true);
            setStateHideHeaderContext(true);
        } else {
            setStateHideFooterContext(false);
            setStateHideHeaderContext(false);
        }

        return undefined;
    }, [props, setStateHideFooterContext, setStateHideHeaderContext]);

    const minhaContaInicioRoute = { label: 'Minha Conta', path: '/minha-conta/inicio' };

    return (
        <Switch>
            <Route component={Aprenda} path="/aprenda" />
            <Route component={Cadastro} path="/cadastro" />
            <Route component={Curso} path="/curso/:slug" />
            <Route component={EsqueceuSenha} path="/esqueceu-senha" />
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
