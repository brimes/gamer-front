import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import LoginScene from './scenes/LoginScene'
import TrackerScene from './scenes/TrackerScene'
import {Route, withRouter} from "react-router-dom";
import jwt from 'jsonwebtoken'

class App extends Component {
    renderStart (props) {
        if (!props.isLoggedIn) {
            return <Route component={LoginScene} />
        }

        return <div>
            <Route exact path="/" component={TrackerScene} />
            <Route exact path="/canal-autorizador" component={TrackerScene} />
            <Route exact path="/retail-edi" component={TrackerScene} />
        </div>
    }
    render () {
        return (
            <div className="App">
                {this.renderStart(this.props)}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let isLoggedIn = state.auth.isLoggedIn

    if (isLoggedIn) {
        const decoded = jwt.decode(state.auth.token)
        const now = Math.floor(Date.now() / 1000)
        if (now > decoded.exp) {
            console.log('Token expired')
            isLoggedIn = false
        }
    }

    return {
        isLoggedIn: isLoggedIn
    };
};

export default withRouter(connect(mapStateToProps)(App));
export { App as PureApp }
