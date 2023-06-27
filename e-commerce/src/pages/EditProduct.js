import { useLocation } from 'react-router';
import ProductForm from '../components/ProductForm';

const EditProduct = () => {
    const location = useLocation();

    return (
        <section className='pagesection'>
            <h1 className='pagetitle_without_bc'>Edit Product</h1>
            <ProductForm isEdit={true} product={location.state?.product} />
        </section>
    );
};

export default EditProduct;