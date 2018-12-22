'use-strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import i18n from './i18n';

//Scenes
import LoginScene from "./scenes/Login";
import HomeScene from "./scenes/Home";
import UsersScene from "./scenes/Users";
import RankingScene from "./scenes/Ranking";
import DocsScene from "./scenes/Docs";

if (document.getElementById('application-content')) {
    ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={HomeScene} />
                <Route path="/home" exact={true} component={HomeScene} />
                <Route path="/login" exact={true} component={LoginScene} />
                <Route path="/logout" exact={true} component={LoginScene} />
                <Route path="/users" exact={true} component={UsersScene} />
                <Route path="/ranking" exact={true} component={RankingScene} />
                <Route path="/api/docs" exact={true} component={DocsScene} />
            </Switch>
        </BrowserRouter>,
        document.getElementById('application-content'));
}
