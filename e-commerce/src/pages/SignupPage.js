import SignupForm from "../components/SignupForm";
import BreadCrumb from '../components/BreadCrumb';

const SignupPage = () => {
    return (
        <section className='pagesection' >
            <BreadCrumb location='Create an Account' />
            <h1 className='pagetitle_with_bc'>Login or Create an Account</h1>
            <SignupForm />
        </section >
    );
};

export default SignupPage;