import { ADD_TODO, TOGGLE_STATUS, DELETE_TODO, EDIT_TODO } from "./actionTypes";

export const addTodo = (data) => {
    return {
        type: ADD_TODO,
        payload: data
    };
};

export const toggleStatus = (data) => {
    return {
        type: TOGGLE_STATUS,
        payload: data
    };
};

export const deleteTodo = (data) => {
    return {
        type: DELETE_TODO,
        payload: data
    };
};

export const editTodos = (data) => {
    return {
        type: EDIT_TODO,
        payload: data
    };
};
