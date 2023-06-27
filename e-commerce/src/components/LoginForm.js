import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import classes from '../styles/LoginForm.module.css';

const LoginForm = () => {
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({
            email: e.target.elements.email.value.toLowerCase().trim(),
            password: e.target.elements.password.value.trim()
        }));
    };

    return (
        <div className={classes.section}>
            <h2>Registered Customers</h2>
            <hr className='line' />
            <span className='spannedtext'>
                If you have an account with us, please log in.
            </span>

            <form onSubmit={submitHandler}>
                <div className='formfield'>
                    <label htmlFor='email'>Email Address *</label>
                    <input type='email' name='email' id='email' />
                </div>
                <div className='formfield'>
                    <label htmlFor='password'>Password *</label>
                    <input type='password' name='password' id='password' />
                </div>

                <button className={`themepinkbutton ${classes.custombutton}`} type='submit'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;