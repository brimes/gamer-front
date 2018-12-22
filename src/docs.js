
import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import Auth from "./components/Auth/index";

function graphQLFetcher(graphQLParams) {
    const auth = new Auth();
    const url = "/api";
    let headers = { 'Content-Type': 'application/json' };
    if (auth.isLogged()) {
        const token = auth.getToken();
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
    }
    return fetch(window.location.origin + url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
}



ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />, document.getElementById('application-content'));