import React, { lazy, Suspense } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import { getLocalStorageUser } from './store/auth/auth';

import { Aprenda } from './component/Page/Aprenda/Aprenda';
import { Cadastro } from './component/Page/Cadastro/Cadastro';
import { Curso } from './component/Page/Curso/Curso';
import { ErrorBoundary } from './component/ErrorBoundary/ErrorBoundary';
import { LoaderComponent } from './component/Loader/LoaderComponent';
import { EsqueceuSenha } from './component/Page/Login/EsqueceuSenha';
import { EsqueceuSenhaReiniciar } from './component/Page/Login/EsqueceuSenhaReiniciar';
import { Home } from './component/Page/Home/Home';
import { LayoutDefault } from './component/Layout/LayoutDefault';
import { LayoutMinhaConta } from './component/Layout/LayoutMinhaConta';
import { LayoutNoHF } from './component/Layout/LayoutNoHF';
import { Login } from './component/Page/Login/Login';
import { Noticia } from './component/Page/Noticia/Noticia';
import { Noticias } from './component/Page/Noticia/Noticias';
import { Pesquisa } from './component/Page/Pesquisa/Pesquisa';

// LAZY
const MinhaConta = lazy(() => import('./component/Page/MinhaConta/MinhaConta'));
const MinhaContaCurso = lazy(() => import('./component/Page/MinhaConta/MinhaContaCurso'));
const MinhaContaCursos = lazy(() => import('./component/Page/MinhaConta/MinhaContaCursos'));

const routes = [
    {
        component: Aprenda,
        layout: LayoutDefault,
        path: '/aprenda'
    },
    {
        component: Cadastro,
        layout: LayoutNoHF,
        path: '/cadastro'
    },
    {
        component: Curso,
        layout: LayoutDefault,
        path: '/curso/:slug'
    },
    {
        component: EsqueceuSenha,
        exact: true,
        layout: LayoutNoHF,
        path: '/esqueci-minha-senha'
    },
    {
        component: EsqueceuSenhaReiniciar,
        layout: LayoutNoHF,
        path: '/esqueci-minha-senha/token/:slug'
    },
    {
        component: Home,
        layout: LayoutDefault,
        path: '/inicio'
    },
    {
        component: Login,
        layout: LayoutNoHF,
        path: '/login'
    },
    {
        breadcrumb: [{ label: 'Cursos', path: '/minha-conta/cursos' }],
        component: MinhaContaCurso,
        isAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta/curso/:slug'
    },
    {
        component: MinhaContaCursos,
        isAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta/cursos'
    },
    {
        component: MinhaContaCursos,
        exact: true,
        isAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta'
    },
    {
        component: MinhaConta,
        isAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta/inicio'
    },
    {
        component: Noticia,
        layout: LayoutDefault,
        path: '/noticia'
    },
    {
        component: Noticias,
        layout: LayoutDefault,
        path: '/noticias'
    },
    {
        component: Pesquisa,
        layout: LayoutDefault,
        path: '/pesquisa/:slug'
    },
    {
        component: MinhaContaCursos,
        isAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta/*'
    },
    {
        component: Home,
        layout: LayoutDefault,
        path: '*'
    }
];

export const Router = () => {
    const user = getLocalStorageUser();

    return (
        <Switch>
            {routes.map(({ breadcrumb, exact, isAuth, component: Component, layout: Layout, path }) => {
                const protect = isAuth;

                return (
                    <Route
                        exact={exact || false}
                        isAuth={isAuth || false}
                        key={path}
                        path={path}
                        render={(props) => (
                            <Layout>
                                <ErrorBoundary>
                                    <Suspense fallback={<LoaderComponent />}>
                                        {protect ? (
                                            user && user.token ? (
                                                <Component breadcrumb={breadcrumb} {...props} />
                                            ) : (
                                                <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />
                                            )
                                        ) : (
                                            <Component breadcrumb={breadcrumb} {...props} />
                                        )}
                                    </Suspense>
                                </ErrorBoundary>
                            </Layout>
                        )}
                    />
                );
            })}
        </Switch>
    );
};
