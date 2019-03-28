import {connect} from "react-redux";
import {setVisibilityFilterAction} from '../actions'
import Link from './Link'

const routeToFilter = (route) => {
    switch (route) {
        case 'all':
            return 'SHOW_ALL';
        case 'active':
            return 'SHOW_ACTIVE';
        case 'completed':
            return 'SHOW_COMPLETED';
    }
};

const mapStateToProps = (store, myProps) => ({
    active: routeToFilter(myProps.filter) === store.visibilityFilter,
});

const mapDispatchToProps = (dispatch, myProps) => ({
    onClick() {
        dispatch(setVisibilityFilterAction(routeToFilter(myProps.filter)))
    }
});

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export default FilterLink

// The above replaces:

// // container component
// class FilterLink extends Component {
//     componentDidMount() {
//         const {store} = this.context;
//         this.unsubscribe = store.subscribe(() =>
//             this.forceUpdate()
//         );
//     }
//
//     componentWillUnmount() {
//         this.unsubscribe();
//     }
//
//     render() {
//         const {filter, children} = this.props;
//         const {store} = this.context;
//         const state = store.getState();
//
//         return (
//             <Link
//                 active={filter === state.visibilityFilter}
//                 onClick={() => {
//                     store.dispatch({
//                         type: 'SET_VISIBILITY_FILTER',
//                         filter
//                     })
//                 }}
//             >
//                 {children}
//             </Link>
//         );
//     }
// }
//
// FilterLink.contextTypes = {
//     store: React.PropTypes.object
// };

