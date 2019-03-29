import {connect} from "react-redux";
import {withRouter} from 'react-router'
import {toggleTodoAction} from '../actions'
import TodoList from './TodoList'

const getVisibleTodos = (todos, filter) => {
    return todos.filter(t => {
        return filter === 'all' ||
            (filter === 'active' && !t.completed) ||
            (filter === 'completed' && t.completed)
    });
};

const mapStateToProps = (state, {params}) => ({
    todos: getVisibleTodos(state.todos, params.filter || 'all')
});

const mapDispatchToProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch(toggleTodoAction(id))
    }
});

const VisibleTodoList = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList));

export default VisibleTodoList