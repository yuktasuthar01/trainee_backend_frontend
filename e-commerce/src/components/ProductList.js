import { useEffect, useState } from 'react';
import { Table, TableBody, TableContainer, TablePagination, TableRow } from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ProductListItem from './ProductListItem';
import { fetchAPI } from '../utils/dataFetching';
import { failure, success } from '../redux/slices/alertSlice';
import classes from '../styles/ProductList.module.css';
import CenteredImage from './CenteredImage';

const ProductList = () => {

    const { search } = useSelector(state => state.query);

    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteProduct = async (id) => {
        try {
            const { message } = await fetchAPI({
                method: 'DELETE',
                url: 'delete/product',
                body: { id }
            });

            dispatch(success(message));

            setProducts(prevState => {
                return prevState.filter(item => item.id !== id);
            });
        } catch (err) {
            dispatch(failure(err.message));
        }
    };

    const getProducts = async () => {
        try {

            const requestObject = {
                method: 'GET',
                url: 'me/products',
                queryParams: {
                    take: rowsPerPage,
                    page
                }
            };

            search && (requestObject.queryParams.search = search);

            const { data } = await fetchAPI(requestObject);

            if (data.count > 0) {
                setProducts(data.products);
            }
            setCount(data.count);
        } catch (err) {
            dispatch(failure(err.message));
        }
    };

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage, search]);

    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <button
                    onClick={e => { navigate('/product/add'); }}
                    className={`themepinkbutton ${classes.searchbutton}`}>
                    Add Product
                </button>
            </div>
            {
                !!count ? (
                    <>
                        <div className={classes.container}>
                            <table className={classes.table}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Title</th>
                                        <th>Subtitle</th>
                                        <th>MRP (₹)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product, index) =>
                                            <ProductListItem
                                                key={product.id}
                                                product={{ ...product, index: index + 1 }}
                                                deleteProduct={deleteProduct} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <TableContainer><Table><TableBody><TableRow>
                            <TablePagination
                                count={count}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={onPageChange}
                                onRowsPerPageChange={onRowsPerPageChange}
                            />
                        </TableRow></TableBody></Table></TableContainer>
                    </>
                ) : (
                    <CenteredImage
                        alt='No Products found'
                        src='/images/girl-empty.gif'

                    />
                )
            }

        </div>
    );
};

export default ProductList;