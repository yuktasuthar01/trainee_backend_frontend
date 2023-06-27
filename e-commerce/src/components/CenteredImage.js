const CenteredImage = ({ src, alt }) => {
    return (
        <div className='imagecontainer'>
            <img src={src} alt={alt} />
        </div>
    );
};

export default CenteredImage;