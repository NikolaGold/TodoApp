import React from "react"
import {Provider} from "react-redux"

import TodoList from "./TodoApp/TodoList";
import {store} from "./store";
import "./App.css";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <TodoList/>
                <footer  className="d-flex justify-content-center">
                    Create by Nikola Goldova
                </footer>
            </div>
        </Provider>
    );
};

export default App;
