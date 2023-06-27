import { useState } from 'react';
import { useDispatch } from 'react-redux/';
import { useNavigate } from 'react-router';
import { fetchAPI } from '../utils/dataFetching';
import { failure, success } from '../redux/slices/alertSlice';
import classes from '../styles/ProductForm.module.css';

const ProductForm = ({ isEdit = false, product }) => {

    const [title, setTitle] = useState(product?.title ?? '');
    const [subtitle, setSubtitle] = useState(product?.subtitle ?? '');
    const [description, setDescription] = useState(product?.description ?? '');
    const [categories, setCategories] = useState(product?.categories?.join(' ') ?? '');
    const [amount, setAmount] = useState(product?.amount ?? '');
    const [sale, setSale] = useState(product?.sale ?? '');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            image && formData.append('image', image);
            isEdit && formData.append('id', product.id);
            formData.append('title', title);
            formData.append('subtitle', subtitle);
            formData.append('categories', categories);
            formData.append('description', description);
            formData.append('amount', amount);
            sale && formData.append('sale', sale);

            const requestObject = {
                method: isEdit ? 'PATCH' : 'POST',
                url: `${isEdit ? 'update' : 'create'}/product`,
                body: formData,
                isFormData: true
            };

            const { message } = await fetchAPI(requestObject);

            dispatch(success(message));
            navigate('/products');

        } catch (err) {
            dispatch(failure(err.message));
        }
    };


    return (
        <form onSubmit={handleSubmit} className={classes.section}>
            <div className='h_fields'>
                <div className='formfield'>
                    <label htmlFor='title'>Product Title *</label>
                    <input
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        id='title'
                        required />
                </div>
                <div className='formfield'>
                    <label htmlFor='author'>Product Subtitle *</label>
                    <input
                        type='text'
                        value={subtitle}
                        onChange={e => setSubtitle(e.target.value)}
                        id='subtitle'
                        required />
                </div>
            </div>

            <div className='h_fields'>
                <div className='formfield'>
                    <label htmlFor='categories'>Shop by Categories</label>
                    <input
                        type='text'
                        value={categories}
                        onChange={e => setCategories(e.target.value)}
                        id='categories' />
                </div>
                <div className='formfield'>
                    <label htmlFor='desc'>Description</label>
                    <input
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        id='desc' />
                </div>
            </div>

            <div className='h_fields'>
                <div className='formfield'>
                    <label htmlFor='amount'>Maximum Retail Price(₹) *</label>
                    <input
                        type='number'
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        id='amount'
                        required />
                </div>
                <div className='formfield'>
                    <label htmlFor='sale'>Sale(%)</label>
                    <input
                        type='number'
                        value={sale}
                        onChange={e => setSale(e.target.value)}
                        id='sale' />
                </div>
            </div>

            <div className={classes.fileinput_container}>
                <input
                    type='file'
                    name='image'
                    onChange={e => setImage(e.target.files?.[0])}
                    className={classes.fileinput}
                    required={!isEdit} />
            </div>

            <div className={classes.buttons}>
                <button
                    type='submit'
                    className='themegreenbutton'>
                    Save
                </button>
                <button
                    type='reset'
                    onClick={() => { navigate(-1); }}
                    className='themepinkbutton'>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ProductForm;