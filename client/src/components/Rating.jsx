import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Rating = ({ rating }) => {
    return (
        <div className="rating">
            {
                [...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                        <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            className={ratingValue <= rating ? "" : "innactive_star"}
                        />
                    );
                })
            }
        </div>
    );
}
export default Rating;