import { useState, useEffect } from "react";
import Banner from "../components/Banner"
import Collapse from "../components/Collapse";
import { getData } from "../util"

import aboutBanner from "../assets/montains.png"


const About = () => {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        getData('/api/about.json').then((data) => {
            setData(data)
            setIsLoaded(true)
        })
    }, [])

    return (
        <>
            <Banner img={aboutBanner} />
            <div className="about">
                {
                    isLoaded && data &&
                    data.map((data, index) => (
                        <Collapse key={index} title={data.title} desc={data.description} className={'collapse_headerPage'} />
                    ))
                }
            </div>
        </>
    );
}
export default About;