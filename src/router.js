import React, { lazy, Suspense, useContext, useEffect } from 'react';

import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { Context } from './store/context';

import { Aprenda } from './component/Page/Aprenda/Aprenda';
import { Cadastro } from './component/Page/Cadastro/Cadastro';
import { Curso } from './component/Page/Curso/Curso';
import { ErrorBoundary } from './component/ErrorBoundary/ErrorBoundary';
import { LoaderComponent } from './component/Loader/LoaderComponent';
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
        <ErrorBoundary>
            <Suspense fallback={LoaderComponent()}>
                <Route
                    render={(props) => (stateAuthTokenContext ? <Component breadcrumb={breadcrumb} {...props} /> : <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />)}
                    {...otherProps}
                />
            </Suspense>
        </ErrorBoundary>
    );
};

export const Router = withRouter(({ ...props }) => {
    // CONTEXT
    const { setStateFooterAlternativeContext, setStateHeaderAlternativeContext } = useContext(Context);

    // ACTION
    // Mudar Header e Footer principais para alternativos de acordo com array do arrayPathname
    const arrayPathname = ['/cadastro', '/esqueceu-senha', '/login', '/minha-conta'];

    useEffect(() => {
        console.log('route: ', props.location);

        setStateFooterAlternativeContext(false);
        setStateHeaderAlternativeContext(false);

        for (let i = 0, l = arrayPathname.length; i < l; i += 1) {
            if (arrayPathname[i] === props.location.pathname) {
                setStateFooterAlternativeContext(true);
                setStateHeaderAlternativeContext(true);

                break;
            }
        }

        return undefined;
    }, [arrayPathname, props, setStateFooterAlternativeContext, setStateHeaderAlternativeContext]);

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
