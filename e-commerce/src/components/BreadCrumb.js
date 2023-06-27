import { Link } from 'react-router-dom';
import classes from '../styles/BreadCrumb.module.css';

const BreadCrumb = ({ location }) => {
    return (
        <div className={classes.container}>
            <Link to='/' className={classes.homeLink}>Home</Link>
            <img alt='Breadcrumb Arrow' src='/images/breadcrumb-arrow.svg' />
            <p>{location}</p>
        </div>
    );
};

export default BreadCrumb;