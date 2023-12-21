const Banner = ({ img, txt }) => {
    return (
        <div className="banner">
            <img src={img} alt="plage" />
            <div className="banner_text">
                {
                    txt && <h2>{txt}</h2>
                }
            </div>
        </div>
    )
}
export default Banner;