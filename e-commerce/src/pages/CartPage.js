import { useSelector, useDispatch } from 'react-redux';
import CartList from '../components/CartList';
import { saveCart } from '../redux/slices/cartSlice';
import classes from '../styles/CartPage.module.css';

const CartPage = () => {
    const { count } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    return (
        <section className={`pagesection ${classes.container}`}>
            <h1 className='pagetitle'>Cart Page</h1>
            {
                count ? (
                    <CartList />
                ) : (
                    <>
                        <div className='imagecontainer'>
                            <img
                                alt='Empty Cart'
                                src='/images/cart-empty.gif'
                            />
                        </div>
                        <button
                            className={`themepinkbutton ${classes.buttoncenter}`}
                            onClick={() => { dispatch(saveCart()); }} >
                            Save Cart
                        </button>
                    </>
                )
            }
        </section>
    );
};

export default CartPage;