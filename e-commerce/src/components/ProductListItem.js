import { useNavigate } from 'react-router';
import classes from '../styles/ProductListItem.module.css';

const ProductListItem = ({ product, deleteProduct }) => {

    const navigate = useNavigate();

    return (
        <tr>
            <td>{product.index}</td>
            <td>{product.title}</td>
            <td>{product.subtitle}</td>
            <td>{product.amount} {product.sale ? `(${product.sale}% OFF)` : null}</td>
            <td className={classes.buttoncontainer}>
                <button onClick={e => navigate('/product/edit', { state: { product } })}>
                    Edit
                </button>
                <button onClick={e => deleteProduct(product.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ProductListItem;