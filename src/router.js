import React, { lazy, Suspense, useEffect } from 'react';

import { matchPath, Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { useApp } from './store/app/app';
import { getLocalStorageUser } from './store/auth/auth';

import { Aprenda } from './component/Page/Aprenda/Aprenda';
import { Cadastro } from './component/Page/Cadastro/Cadastro';
import { Curso } from './component/Page/Curso/Curso';
import { ErrorBoundary } from './component/ErrorBoundary/ErrorBoundary';
import { LoaderComponent } from './component/Loader/LoaderComponent';
import { EsqueceuSenha } from './component/Page/Login/EsqueceuSenha';
import { EsqueceuSenhaReiniciar } from './component/Page/Login/EsqueceuSenhaReiniciar';
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
    const user = getLocalStorageUser();

    return (
        <ErrorBoundary>
            <Suspense fallback={LoaderComponent()}>
                <Route
                    render={(props) => (user && user.token ? <Component breadcrumb={breadcrumb} {...props} /> : <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />)}
                    {...otherProps}
                />
            </Suspense>
        </ErrorBoundary>
    );
};

// const LazyRoute = ({ component: Component, ...otherProps }) => {
//     return (
//         <ErrorBoundary>
//             <Suspense fallback={LoaderComponent()}>
//                 <Route render={(props) => <Component {...props} />} {...otherProps} />
//             </Suspense>
//         </ErrorBoundary>
//     );
// };

export const Router = withRouter(({ ...props }) => {
    // ACTION
    const { setStateFooterAlternativeContext, setStateHeaderAlternativeContext } = useApp();

    // Mudar Header e Footer principais para alternativos de acordo com array do arrayPathname
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        const alternative = matchPath(props.location.pathname, {
            path: ['/cadastro', '/esqueci-minha-senha', '/login', '/minha-conta']
        });

        setStateFooterAlternativeContext(alternative);
        setStateHeaderAlternativeContext(alternative);

        return undefined;
    }, [props.location.pathname]);
    /* eslint-enable react-hooks/exhaustive-deps */

    const minhaContaInicioRoute = { label: 'Minha Conta', path: '/minha-conta/inicio' };

    return (
        <Switch>
            <Route component={Aprenda} path="/aprenda" />
            <Route component={Cadastro} path="/cadastro" />
            <Route component={Curso} path="/curso/:slug" />
            <Route component={EsqueceuSenha} path="/esqueci-minha-senha" />
            <Route component={EsqueceuSenhaReiniciar} path="/esqueci-minha-senha/token/:slug" />
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
