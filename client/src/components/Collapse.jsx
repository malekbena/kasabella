import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Collapse = ({ title, desc, list, className }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleCollapse = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    return (
        <div className="collapse">
            <div className={`collapse_header ${className}`}>
                <h2 className='title'>{title}</h2>
                <button className={`collapse_btn ${isOpen ? "active" : "inactive"}`} onClick={(e) => { toggleCollapse(e) }}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </button>
            </div>
            <div className={`collapse_body ${isOpen ? "active" : "inactive"}`}>
                {
                    list ? (
                        <>
                            <ul className={`${isOpen ? "active" : "inactive"}`}>
                                {
                                    list.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))
                                }
                            </ul>
                        </>
                    ) : (
                            
                        <p className={`${isOpen ? "active" : "inactive"}`}>{desc}</p>
                    )
                }
            </div>
        </div>
    );
}
export default Collapse;