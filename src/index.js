import React from 'react';
import { hydrate, render } from 'react-dom';

import { App } from './App';

// APP
const renderMethod = module.hot ? render : hydrate;

renderMethod(<App />, document.getElementById('app'));

// HOT MODULE
if (module.hot) {
    module.hot.accept();
}
