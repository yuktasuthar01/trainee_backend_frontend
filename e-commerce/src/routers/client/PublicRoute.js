import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component }) => {
    const auth = useSelector(state => state.auth);

    return auth?.loggedIn ? <Navigate to='/dashboard' replace /> : <Component />;
};

export default PublicRoute;