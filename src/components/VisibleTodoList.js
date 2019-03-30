import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router';
import * as actions from '../actions';
import {getVisibleTodos, getErrorMessage, getIsFetching} from '../reducers';
import TodoList from './TodoList';
import FetchError from './FetchError';

// VisibleTodoList is a container component that enhances a
// presentational component (TodoList) with data fetching logic
class VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    // fetchTodos is in the props because it is passed in the connect below.
    // it is the only way the redux store will know that the todos have been updated.
    fetchData() {
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
    }

    // toggleTodo is passed in through the actions object in connect below
    // only toggleTodo needs to be renamed. The rest of the actions can be passed
    // directly through ...rest
    render() {
        const {toggleTodoAction, errorMessage, isFetching, todos} = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }
        if (errorMessage && !todos.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchData()}
                    />
            );
        }

        return <TodoList
            todos={todos}
            onTodoClick={toggleTodoAction}
        />;
    }
}

// we return filter so that it is visible to the VisibleTodoList component
const mapStateToProps = (state, {params}) => {
    const filter = params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        errorMessage: getErrorMessage(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    }
};

// The VisibleTodoList does not subscribe to the store itself, so we wrap it
// a connect call so that the container generated by react-redux connect subscribes
// to the store and passes the props to the VisibleTodoList component we wrote.
// The component generated by withRouter subscribes to the router changes so we have
// access to the router changes in the params in mapStateToProps
//
// Also, we are passing the receiveTodos action inside the actions object
VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList));

// replaced:
// const mapDispatchToProps = (dispatch) => ({
//     onTodoClick(id) {
//         dispatch(toggleTodoAction(id))
//     }
// });


export default VisibleTodoList