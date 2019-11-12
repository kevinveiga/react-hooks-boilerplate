import React from 'react';
import { hydrate } from 'react-dom';

import { App } from './App';

// APP
hydrate(<App />, document.getElementById('app'));
