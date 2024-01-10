import { NavLink } from "react-router-dom";
import Button from "./Button";

const Cards = ({ accomodations, isAdmin, onClick }) => {
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
                                                    <Button value={"edit"} dataId={data._id} text="Modifier" className="button__edit button-hover" onClick={onClick} />
                                                    <Button value={"delete"} dataId={data._id} text="Supprimer" className="button__delete button-hover" onClick={onClick} />
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