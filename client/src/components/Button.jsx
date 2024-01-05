import { NavLink } from "react-router-dom"

const Button = ({ text, onClick, className, link, value, dataId }) => {
    return (
        <>
            {
                link ?
                    <NavLink className={`button ${className}`} to={link}>
                        {text}
                    </NavLink>
                    :
                    <button value={value} data-id={dataId} className={`button ${className}`} onClick={onClick}>{text}</button>
            }
        </>
    )
}

export default Button