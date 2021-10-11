import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";
import "./index.css";

/**
 * Redux is a predictable sstate container for Js apps
 * Three core redux concepts:
 * A store that holds the state of your application
 * An action that describes the changes in the state of the application
 * A reducer which actually carries out the state transition depending on the action
 **/

/**
 * @param {Reducer Funtion} reducers - Reducers are functions that take the current state and an action as arguments, and return a new state result. In other words, (state, action) => newState.
 * @param {Middleware Function} compose(applyMiddleware(thunk)) -
 * compose composes functions from right to left
 * thunks enable us to avoid directly causing side effects in our actions, action creators, or components. Instead, anything impure will be wrapped in a thunk. Later, that thunk will be invoked by middleware to actually cause the effect.
 */
const store = createStore(reducers, compose(applyMiddleware(thunk)));

/**
 * @param {Component} App - the component to be rendered
 * @param {Method} document.getElementById - the global method for selecting where the component is to be rendered
 */
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
