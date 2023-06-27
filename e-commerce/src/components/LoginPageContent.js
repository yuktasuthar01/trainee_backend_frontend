import { useNavigate } from 'react-router';
import classes from '../styles/LoginPageContent.module.css';

const LoginPageContent = (props) => {

    const navigate = useNavigate();

    return (
        <div className={classes.section}>
            <div className={classes.section_one}>
                <h2>New Customer</h2>
                <hr className='line' />
                <span className='spannedtext'>Registration is free and easy.</span>
                <ul>
                    <li>
                        Faster Checkout
                    </li>
                    <li>
                        Save multiple shipping addresses
                    </li>
                    <li>
                        View and track orders and more
                    </li>
                </ul>
            </div>
            <div className={classes.section_two}>
                <button
                    className={`themepinkbutton ${classes.custombutton}`}
                    onClick={() => navigate('/signup')} >
                    Create an Account
                </button>
            </div>
        </div >
    );
};

export default LoginPageContent;