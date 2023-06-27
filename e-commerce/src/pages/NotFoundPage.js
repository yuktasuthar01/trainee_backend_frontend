import CenteredImage from '../components/CenteredImage';

const NotFoundPage = () => {
    return (
        <section className={'pagesection'}>
            <CenteredImage
                alt='page not found'
                src='/images/404.gif'
            />
        </section>
    );
};

export default NotFoundPage;