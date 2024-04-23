const Loader = ({text}) => {
    return (
        <div className="loader-container">
            <p>
                {text}
            </p>
            <span className="loader"></span>
        </div>
    )
}
export default Loader