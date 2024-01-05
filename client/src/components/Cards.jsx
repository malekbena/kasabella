import { NavLink } from "react-router-dom";
import Button from "./Button";

const Cards = ({ accomodations, isAdmin }) => {
    return (
        <>
            {
                accomodations && (

                    <div className="cards">
                        {accomodations.map((data) => {
                            return (
                                <article key={data._id}>
                                    {
                                        isAdmin ? (
                                            <>
                                                <div className="card_overlay"></div>
                                                <img src={data.cover} alt={data.title} />
                                                    <Button text="Modifier" className="button__edit" />
                                                    <Button text="Supprimer" className="button__delete" />
                                                <div className="card_text">
                                                    <p>{data.title}</p>
                                                </div>
                                            </>
                                        ) :
                                            <NavLink to={`/logement/${data._id}`}>
                                                <div className="card_overlay"></div>
                                                <img src={data.cover} alt={data.title} />
                                                <div className="card_text">
                                                    <p>{data.title}</p>
                                                </div>
                                            </NavLink>
                                    }
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