import React, { lazy, Suspense } from 'react';

import { Route, Switch, useHistory, withRouter } from 'react-router-dom';

import { getLocalStorageUser } from './store/auth/auth';

import { setStorage } from './util/storage';

import { Aprenda } from './component/Page/Aprenda/Aprenda';
import { Cadastro } from './component/Page/Cadastro/Cadastro';
import { Carrinho } from './component/Page/Carrinho/Carrinho';
import { CarrinhoCadastro } from './component/Page/Carrinho/CarrinhoCadastro';
import { CarrinhoPagamento } from './component/Page/Carrinho/CarrinhoPagamento';
import { CarrinhoRetorno } from './component/Page/Carrinho/CarrinhoRetorno';
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
import { PesquisaNoticia } from './component/Page/Pesquisa/PesquisaNoticia';

// LAZY
const MinhaConta = lazy(() => import('./component/Page/MinhaConta/MinhaConta'));
const MinhaContaContato = lazy(() => import('./component/Page/MinhaConta/MinhaContaContato'));
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
        component: Carrinho,
        layout: LayoutDefault,
        path: '/carrinho'
    },
    {
        component: CarrinhoCadastro,
        layout: LayoutDefault,
        path: '/carrinho-cadastro'
    },
    {
        component: CarrinhoPagamento,
        hasAuth: true,
        layout: LayoutDefault,
        loginPath: '/carrinho-cadastro',
        path: '/carrinho-pagamento'
    },
    {
        component: CarrinhoRetorno,
        layout: LayoutDefault,
        path: '/carrinho-retorno/:paymentType/:billetUrl?'
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
        component: MinhaContaContato,
        hasAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta/contato'
    },
    {
        breadcrumb: [{ label: 'Cursos', path: '/minha-conta/cursos' }],
        component: MinhaContaCurso,
        hasAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta/curso/:slug'
    },
    {
        component: MinhaContaCursos,
        hasAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta/cursos'
    },
    {
        component: MinhaContaCursos,
        exact: true,
        hasAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta'
    },
    {
        component: MinhaConta,
        hasAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta/inicio'
    },
    {
        component: Noticia,
        layout: LayoutDefault,
        path: '/noticia/:slug'
    },
    {
        component: Noticias,
        layout: LayoutDefault,
        path: '/noticias'
    },
    {
        component: PesquisaNoticia,
        layout: LayoutDefault,
        path: '/pesquisa-noticia/:slug'
    },
    {
        component: MinhaContaCursos,
        hasAuth: true,
        layout: LayoutMinhaConta,
        path: '/minha-conta/*'
    },
    {
        component: Home,
        layout: LayoutDefault,
        path: '*'
    }
];

export const Router = withRouter(() => {
    const history = useHistory();

    const handleRedirect = (loginPath, urlToRedirect) => {
        // Salva a URL de redirecionamento em sessionStorage
        setStorage('redirectUrl', urlToRedirect, 'sessionStorage');

        history.push(loginPath);
    };

    // Update Active Campaign tracking
    window.vgo('update');
    window.vgo('process');

    const user = getLocalStorageUser();

    return (
        <Switch>
            {routes.map(({ breadcrumb, exact, hasAuth, component: Component, layout: Layout, loginPath = '/login', path }) => {
                return (
                    <Route
                        exact={exact || false}
                        hasAuth={hasAuth || false}
                        key={path}
                        path={path}
                        render={(props) => (
                            <Layout>
                                <ErrorBoundary>
                                    <Suspense fallback={<LoaderComponent />}>
                                        {hasAuth ? (
                                            user && user.token ? (
                                                <Component breadcrumb={breadcrumb} {...props} />
                                            ) : (
                                                handleRedirect(loginPath, props.location.pathname)
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
});
