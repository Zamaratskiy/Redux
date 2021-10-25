import './styles.css'
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from "./redux/rootReduser";
import thunk from "redux-thunk";
import {async_increment, changeTheme, decrement, increment} from "./redux/actions";

let counter = document.getElementById('counter');
let addBtn = document.getElementById('add');
let subBtn = document.getElementById('sub');
let asyncBtn = document.getElementById('async');
let themeBtn = document.getElementById('theme');

function logger(state) {
    return function (next) {
        return function (action) {
            console.log('State', state.getState())
            console.log('Action', action)
            return next(action)
        }
    }
}

let store = createStore(rootReducer, applyMiddleware(thunk, logger))
addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})
subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})
asyncBtn.addEventListener('click', () => {
    store.dispatch(async_increment())
})
themeBtn.addEventListener('click', () => {
    let newTheme = document.body.classList.contains('light') ? 'dark' : 'light'
    store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {


    counter.textContent = store.getState().counter;
    document.body.className = store.getState().theme.value;
    [addBtn, subBtn, asyncBtn, themeBtn].forEach((btn) => btn.disabled = store.getState().theme.disabled)
})
store.dispatch({type: 'INIT_APPLICATION'})

window.store = store;
