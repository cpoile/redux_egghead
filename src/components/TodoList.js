import React from "react";
import TodoItem from './TodoItem'

const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo =>
            <TodoItem
                key={todo.id}
                onClick={() => onTodoClick(todo.id)}
                {...todo}
            />
        )}
    </ul>
);

export default TodoList