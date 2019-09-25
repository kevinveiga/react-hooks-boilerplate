import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Contato } from './component/Page/Contato/Contato';
import { Home } from './component/Page/Home/Home';
import { Noticia } from './component/Page/Noticia/Noticia';
import { Noticias } from './component/Page/Noticia/Noticias';
import { Pesquisa } from './component/Page/Pesquisa/Pesquisa';

export const Router = () => {
    return (
        <Switch>
            <Route path="/inicio" component={Home} />
            <Route path="/contato" component={Contato} />
            <Route path="/noticia/:slug" component={Noticia} />
            <Route path="/noticias" component={Noticias} />
            <Route path="/pesquisa/:slug" component={Pesquisa} />
            <Route path="*" component={Home} />
        </Switch>
    );
};
