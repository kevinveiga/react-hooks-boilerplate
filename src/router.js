import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { scrollToTop } from './util/scrollToTop';

import { Contato } from './component/Page/Contato/Contato';
import { Home } from './component/Page/Home/Home';
import { Noticia } from './component/Page/Noticia/Noticia';
import { Noticias } from './component/Page/Noticia/Noticias';

export const Router = withRouter(() => {
    scrollToTop();

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contato" component={Contato} />
            <Route path="/noticia/:slug" component={Noticia} />
            <Route path="/noticias" component={Noticias} />
            <Route path="*" component={Home} />
        </Switch>
    );
});
