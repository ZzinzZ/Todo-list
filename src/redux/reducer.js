import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./actionTypes";
import Data from "@/data/data";

let initState = {
    todos: [],
};

if (typeof window !== 'undefined') {
    const storedTodos = localStorage.getItem('DataApi');
    if (storedTodos) {
        initState = {
            todos: JSON.parse(storedTodos)
        };
    }
}

export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case ADD_TODO:
            const newTodos = [...state.todos, payload];
            localStorage.setItem('DataApi', JSON.stringify(newTodos)); 
            return {
                todos: newTodos
            };

        case DELETE_TODO:
            const deleteTodos = state.todos.filter((todo) => todo.id !== payload);
            localStorage.setItem('DataApi', JSON.stringify(deleteTodos));
            return {
                todos: deleteTodos
            };
        case EDIT_TODO:
            const updatedTodos = state.todos.map((todo) => {
                if (todo.id === payload.id) {
                    return payload; 
                }
                return todo;
            });
            localStorage.setItem('DataApi', JSON.stringify(updatedTodos));
            return {
                todos: updatedTodos,
            };
        default:
            return state;
    }
};

export default reducer;
