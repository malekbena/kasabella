import { NavLink } from "react-router-dom"

const Button = ({ text, onClick, className, isLink }) => {
    return (
        <>
            {
                isLink ?
                    <NavLink className={`button ${className}`} to={'/login'}>
                        {text}
                    </NavLink>
                    :
                    <button className={`button ${className}`} onClick={onClick}>{text}</button>
            }
        </>
    )
}

export default Button