import React from "react"
import {Provider} from "react-redux"

import TodoList from "./Components/TodoList";
import {store} from "./store";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <TodoList/>
                <footer  className="d-flex justify-content-center">
                    Created by Nikola Goldova
                </footer>
            </div>
        </Provider>
    );
};

export default App;
