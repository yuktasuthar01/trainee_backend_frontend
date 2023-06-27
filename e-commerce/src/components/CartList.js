import classes from '../styles/CartList.module.css';
import CartListItem from './CartListItem';
import { useDispatch, useSelector } from 'react-redux';
import { saveCart } from '../redux/slices/cartSlice';

const CartList = () => {
    const { products, count, total } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <h2>{`My Shopping Bag (${count} Items)`}</h2>
                <h2>{`Total price: ₹${total}`}</h2>
            </div>
            <div className={classes.items}>
                {
                    products.map(product => <CartListItem key={product.data.id} product={product} />)
                }
            </div>
            <button
                className={`themepinkbutton ${classes.button}`}
                onClick={() => { dispatch(saveCart()); }}>
                Save Cart
            </button>
        </div>
    );
};

export default CartList;