import classes from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <img alt='Tatvasoft Logo' src='/images/site-logo.svg' />
            <p>&copy; 2022 Tatvasoft.com. All rights reserved.</p>
        </footer>
    );
};

export default Footer;