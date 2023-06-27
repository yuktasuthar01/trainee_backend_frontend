import { useDispatch } from 'react-redux';
import { clearSearch, filterBy } from '../redux/slices/querySlice';
import classes from '../styles/SearchBar.module.css';

const SearchBar = () => {
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(filterBy(e.target.elements.search.value));
    };

    const onReset = (e) => {
        dispatch(clearSearch());
    };

    return (
        <section className={classes.section}>
            <form
                onSubmit={onSubmit}
                onReset={onReset}
                className={classes.container}>
                <input
                    name='search'
                    type='search'
                    placeholder='What are you looking for...'
                    className={`searchbar ${classes.searchbar}`} />
                <button
                    type='submit'
                    className={`themegreenbutton ${classes.search_button}`}>
                    <img
                        alt='Search Icon'
                        src='/images/search.svg' />
                    <p>Search</p>
                </button>
                <button
                    type='reset'
                    className={`themepinkbutton ${classes.cancel_button}`}>
                    Cancel
                </button>
            </form>
        </section>
    );
};

export default SearchBar;