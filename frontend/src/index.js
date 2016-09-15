import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from './stores';
import Login from './components/login';
import Registration from './components/registration';
import Home from './components/home';

const store = configureStore();
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

import './styles/app.scss';

const App = React.createClass({
    render() {
        return (
            <div className="site__container">
                {this.props.children}
            </div>
        )
    }
});

render((
    <Provider store={store}>
        <Router history={appHistory }>
            <Route path="/" component={App}>
                <Route path="login" component={Login}/>
                <Route path="registration" component={Registration}/>
                <Route path="home" component={Home}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
