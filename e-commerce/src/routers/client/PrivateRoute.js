import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
    const auth = useSelector(state => state.auth);

    return auth?.loggedIn ? <Component /> : <Navigate to='/' replace />;
};

export default PrivateRoute;