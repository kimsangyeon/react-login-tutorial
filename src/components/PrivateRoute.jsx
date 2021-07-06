import {Route} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const PrivateRoute = ({component: Component, roles, ...rest}) => (
  <Route {...rest} render={props => {
    if (!localStorage.getItem('user')) {
      return <LoginPage />
    }
    
    return <Component {...props} />
  }} />
);

export default PrivateRoute;