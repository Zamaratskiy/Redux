import {ASYNC_INCREMENT, CHANGE_THEME, DECREMENT, DISABLE_BUTTONS, ENABLE_BUTTONS, INCREMENT} from "./types";


export function increment() {
    return {type: INCREMENT}
}

export function decrement() {
    return {type: DECREMENT}
}

export function enableButtons() {
    return {type: ENABLE_BUTTONS}
}

export function disableButtons() {
    return {type: DISABLE_BUTTONS}
}

export function async_increment() {
    return (dispatch) => {
        dispatch(disableButtons())
        setTimeout(() => {
            dispatch({type: ASYNC_INCREMENT});
            dispatch(enableButtons())
        }, 2000)
    }
}

export function changeTheme(newTheme) {
    return {type: CHANGE_THEME, payload: newTheme}
}