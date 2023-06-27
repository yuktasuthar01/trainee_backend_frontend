import { useDispatch } from 'react-redux';
import { Buffer } from 'buffer';
import { decreaseCount, getFinalPrice, increaseCount, removeProduct } from '../redux/slices/cartSlice';
import classes from '../styles/CartListItem.module.css';

const CartListItem = ({ product: { data, count } }) => {

    const dispatch = useDispatch();

    return (
        <div className={classes.container}>
            <img
                alt={`${data.title}`}
                src={`data:image/png;base64,${Buffer.from(data.image).toString('base64')}`} />
            <div className={classes.cardcontent}>
                <div className={`${classes.h_content} ${classes.first_div}`}>
                    <span>{data.title}</span>
                    <span>₹{getFinalPrice(data.amount, data.sale, count)}</span>
                </div>
                <div className={`${classes.h_content} ${classes.second_div}`}>
                    <span>{data.subtitle}</span>
                    {
                        data.sale > 0 && (
                            <div className={classes.sale}>
                                <span>
                                    ₹<s>{data.amount}</s>
                                </span>
                                <span>
                                    {data.sale}% off
                                </span>
                            </div>
                        )
                    }
                </div>
                <div className={classes.h_content}>
                    <div className={classes.buttons}>
                        <button
                            className='themepinkbutton'
                            onClick={e => { dispatch(increaseCount({ id: data.id })); }} >
                            +
                        </button>
                        <span>{count}</span>
                        <button
                            className='themepinkbutton'
                            onClick={e => { dispatch(decreaseCount({ id: data.id })); }} >
                            -
                        </button>
                    </div>
                    <span
                        className={classes.removebutton}
                        onClick={e => dispatch(removeProduct({ id: data.id }))} >
                        Remove
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartListItem;