import {connect} from "react-redux";
import {toggleTodoAction} from '../actions'
import TodoList from './TodoList'

const getVisibleTodos = (todos, filter) => {
    return todos.filter(t => {
        return filter === 'SHOW_ALL' ||
            (filter === 'SHOW_ACTIVE' && !t.completed) ||
            (filter === 'SHOW_COMPLETED' && t.completed)
    });
};

const mapStateToTodoListProps = (state) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch(toggleTodoAction(id))
    }
});

const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

export default VisibleTodoList