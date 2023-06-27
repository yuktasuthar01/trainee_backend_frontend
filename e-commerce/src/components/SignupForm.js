import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import { failure } from '../redux/slices/alertSlice';
import classes from '../styles/SignupForm.module.css';

const SignupForm = () => {
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            const password = e.target.elements.password.value.trim();
            const confirmPassword = e.target.elements.cpassword.value.trim();
            const email = e.target.elements.email.value.toLowerCase().trim();
            const firstName = e.target.elements.fname.value.trim();
            const lastName = e.target.elements.lname.value.trim();

            if (password !== confirmPassword) {
                throw new Error('Passwords don\'t match.');
            }

            dispatch(signup({
                email,
                password,
                firstName,
                lastName
            }));
        } catch (err) {
            dispatch(failure(err.message));
        }
    };

    return (
        <form onSubmit={submitHandler} className={classes.section}>
            <div className={classes.subsection}>
                <h2>Personal Information</h2>
                <hr className='line' />
                <span className='spannedtext'>Please enter the following information to create your account.</span>

                <div className={classes.form1}>
                    <div className='h_fields'>
                        <div className='formfield' >
                            <label htmlFor='fname'>
                                First Name *
                            </label>
                            <input type='text' name='fname' id='fname' />
                        </div>
                        <div className='formfield' >
                            <label htmlFor='lname'>
                                Last Name *
                            </label>
                            <input type='text' name='lname' id='lname' />
                        </div>
                    </div>
                    <div className='formfield' >
                        <label htmlFor='email'>
                            Email Address *
                        </label>
                        <input type='email' name='email' id='email' />
                    </div>
                </div>
            </div>
            <div className={classes.subsection}>
                <h2>Login Information</h2>
                <hr className='line' />

                <div className={classes.form2}>
                    <div className='h_fields'>
                        <div className='formfield'>
                            <label htmlFor='password'>Password *</label>
                            <input type='password' name='password' id='password' />
                        </div>
                        <div className='formfield'>
                            <label htmlFor='cpassword'>Confirm Password *</label>
                            <input type='password' name='cpassword' id='cpassword' />
                        </div>
                    </div>
                </div>
            </div>
            <button
                type='submit'
                className={`themepinkbutton ${classes.custombutton}`} >
                Register
            </button>
        </form>
    );
};

export default SignupForm;