import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeZh from 'react-intl/locale-data/zh';
import locales from './locale';
import DashboardComponent from './components/DashboardComponent';
import ScreenComponent from './components/ScreenComponent';
import Editor from './components/Editor';

addLocaleData([...localeZh]);

const locale = 'zh';

render((
  <IntlProvider locale={locale} messages={locales[locale]}>
    <Router history={hashHistory} queryKey="false">
      <Route path="/" component={ScreenComponent} />
      <Route path="/screen" component={ScreenComponent} />
      <Route path="/home" component={DashboardComponent} />
      <Route path="/editor" component={Editor}>
        <Route path=":id" component={Editor} />
      </Route>
    </Router>
  </IntlProvider>
), document.getElementById('app'));
