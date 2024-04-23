import { useState, useEffect } from "react";
import Banner from "../components/Banner"
import Collapse from "../components/Collapse";
import Loader from "../components/Loader";
import { getData } from "../util"

import aboutBanner from "../assets/montains.png"


const About = () => {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        getData('/abouts').then((data) => {
            setData(data.abouts)
            setIsLoaded(true)
        })
    }, [])

    return (
        <>
            <Banner img={aboutBanner} />
            <div className="about">
                {
                    isLoaded && data ? (
                        data.map((data, index) => (
                            <Collapse key={index} title={data.title} desc={data.description} className={'collapse_headerPage'} />
                        ))
                    ) : (
                        <Loader text="Un instant s'il vous plaît" />
                    )
                }
            </div>
        </>
    );
}
export default About;