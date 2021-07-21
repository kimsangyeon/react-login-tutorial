import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, roles, ...rest}) => (
  <Route {...rest} render={props => {
    if (!localStorage.getItem('user')) {
      return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
    }

    return <Component {...props} />
  }} />
);

export default PrivateRoute;