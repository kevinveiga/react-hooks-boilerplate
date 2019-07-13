import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Contato } from './component/Page/Contato/Contato';
import { Home } from './component/Page/Home/Home';

export const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contato" component={Contato} />
            <Route path="*" component={Home} />
        </Switch>
    );
};
