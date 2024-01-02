import { NavLink } from "react-router-dom"

const Button = ({ text, onClick, className, link }) => {
    return (
        <>
            {
                link ?
                    <NavLink className={`button ${className}`} to={link}>
                        {text}
                    </NavLink>
                    :
                    <button className={`button ${className}`} onClick={onClick}>{text}</button>
            }
        </>
    )
}

export default Button