import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import data from "../data/data.json";
import Carousel from "../components/Carousel";
import Tag from "../components/Tag";
import Rating from "../components/Rating";
import Collapse from "../components/Collapse";
import { getData } from "../util"

const Accomodation = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [accomodation, setAccomodation] = useState()
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    getData('/api/data.json').then((data) => {
      let res = data.find((accomodation) => accomodation.id === id)
      if (!res) {
        navigate('/404')
      }
      setAccomodation(res)
      setIsLoaded(true)
    })

  }, [id, navigate])


  return (
    <>
      {
        isLoaded &&
        <div className="accomodation">
          <Carousel data={accomodation.pictures} />
          <div className="accomodation_box">
            <div className="accomodation_block1">
              <h2> {accomodation.title} </h2>
              <p> {accomodation.location} </p>
              {
                accomodation.tags && (
                  <div className="tags">
                    {
                      accomodation.tags.map((tag, index) => (
                        <Tag key={index} tag={tag} />
                      ))
                    }
                  </div>
                )
              }
            </div>
            <div className="accomodation_block2">
              <div className="accomodation_host">
                <p> {accomodation.host.name} </p>
                <img src={accomodation.host.picture} alt="" />
              </div>
              <Rating rating={accomodation.rating} />
            </div>
          </div>
          <div className="accomodation_collapses">
            <Collapse title="Description" desc={accomodation.description} className={'collapse_headerAccomodation'} />
            <Collapse title="Equipements" list={accomodation.equipments} className={'collapse_headerAccomodation'} />
          </div>
        </div>
      }
    </>
  );
}
export default Accomodation;