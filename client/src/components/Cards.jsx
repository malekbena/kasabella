import { NavLink } from "react-router-dom";

const Cards = ({ accomodations }) => {
    return (
        <>
            {
                accomodations && (
                    
                    <div className="cards">
                        {accomodations.map((data) => {
                            return (
                                <article key={data._id}>
                                    <NavLink to={`/logement/${data._id}`}>
                                        <div className="card_overlay"></div>
                                        <img src={data.cover} alt={data.title} />
                                        <div className="card_text">
                                            <p>{data.title}</p>
                                        </div>
                                    </NavLink>
                                </article>
                            )
                        })}
                    </div>
                ) 
            }
        </>
    )
}
export default Cards;