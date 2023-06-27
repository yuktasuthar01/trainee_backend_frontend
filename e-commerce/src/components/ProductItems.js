import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from './ProductItem';
import { fetchAPI } from '../utils/dataFetching';
import { failure } from '../redux/slices/alertSlice';
import { sortBy } from '../redux/slices/querySlice';
import CenteredImage from './CenteredImage';
import classes from '../styles/ProductItems.module.css';

const ProductItems = () => {

    const { search, sort } = useSelector(state => state.query);
    const dispatch = useDispatch();
    const itemsPerPage = 12;

    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [trigger, setTrigger] = useState(false);

    const countPages = (totalProducts) => {
        const result = (totalProducts / (itemsPerPage + 1)) + 1;
        return parseInt(result);
    };

    const getProducts = async (page) => {
        try {
            const requestObject = {
                method: 'GET',
                url: 'products',
                queryParams: {
                    take: itemsPerPage,
                    page
                }
            };

            search && (requestObject.queryParams.search = search);
            sort && (requestObject.queryParams.sort = sort);

            const { data } = await fetchAPI(requestObject);

            if (data.count <= itemsPerPage) {
                setCurrentPage(state => {
                    return state === 1 ? state : state - 1;
                });
            }

            if (data.count > 0) {
                setProducts(data.products);
            }

            setPages(countPages(data.count));
            setCount(data.count);
        } catch (err) {
            dispatch(failure(err.message));
        }
    };

    const onPageChange = (_, page) => {
        console.log('Changed');
        if (currentPage !== page) {
            setCurrentPage(page);
            setTrigger(!trigger);
        }
    };

    const onSortingChange = (e) => { dispatch(sortBy(e.target.value)); };

    useEffect(() => {
        getProducts(currentPage - 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger, search, sort]);


    return (
        <div className={classes.section}>
            {
                !!count ? (
                    <>
                        <div className={classes.header}>
                            <h2>Products - {count} items</h2>
                            <div className={classes.sort}>
                                <label htmlFor='sort'>Sort By</label>
                                <select
                                    defaultValue=''
                                    onChange={onSortingChange}
                                    id='sort'
                                    name='sort'>
                                    <option value=''>-</option>
                                    <option value='asc'>a-z</option>
                                    <option value='desc'>z-a</option>
                                </select>
                            </div>
                        </div>
                        <div className={classes.items}>
                            {
                                products.map(product => <ProductItem key={product.id} product={product} />)
                            }
                        </div>
                        <Pagination
                            className={classes.pagination}
                            onChange={onPageChange}
                            page={currentPage}
                            count={pages}
                            color="primary" />
                    </>
                ) : (
                    <CenteredImage
                        alt='No products found'
                        src='/images/girl-empty.gif'
                    />
                )
            }
        </div>
    );
};

export default ProductItems;