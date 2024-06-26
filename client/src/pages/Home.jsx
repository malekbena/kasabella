import { useState, useEffect } from "react";
import Banner from "../components/Banner"
import Cards from "../components/Cards";
import { getData } from "../util";
import Loader from "../components/Loader";

import homeBanner from "../assets/beach.png"

const Home = () => {
  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getData('/accomodations').then((data) => {
      setData(data.accomodations)
      setIsLoaded(true)
    })
  }, []);

  return (
    <>
      <Banner img={homeBanner} txt="Chez vous, partout et ailleurs" />
      {
        isLoaded && data ? (
          <Cards accomodations={data} />
        ): (
          <Loader text="Un instant, nous cherchons les meilleurs offres pour vous..." />
        )
      }
    </>
  );
}

export default Home;
