import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import Dashboard from '../../pages/Dashboard';
import Products from '../../pages/Products';
import EditProduct from '../../pages/EditProduct';
import CartPage from '../../pages/CartPage';
import Footer from '../../components/Footer';
import PublicRoute from '../../routers/client/PublicRoute';
import PrivateRoute from '../../routers/client/PrivateRoute';
import CreateProduct from '../../pages/CreateProduct';
import NotFoundPage from '../../pages/NotFoundPage';


const AppRouter = () => {
    return (
        <Router>
            <Header />
            <SearchBar />
            <Routes>
                <Route path='/' exact element={<PublicRoute component={LoginPage} />} />
                <Route path='/signup' element={<PublicRoute component={SignupPage} />} />
                <Route path='/dashboard' element={<PrivateRoute component={Dashboard} />} />
                <Route path='/products' element={<PrivateRoute component={Products} />} />
                <Route path='/product/add' element={<PrivateRoute component={CreateProduct} />} />
                <Route path='/product/edit' element={<PrivateRoute component={EditProduct} />} />
                <Route path='/cart' element={<PrivateRoute component={CartPage} />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRouter;