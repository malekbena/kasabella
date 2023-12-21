import { useState } from 'react'
import arrow_left from '../assets/arrow_left.svg'
import arrow_right from '../assets/arrow_right.svg'

const Carousel = ({data}) => {
    const [current, setCurrent] = useState(0)
    const nextSlide = (e) => {
        e.preventDefault()
        setCurrent(current === data.length - 1 ? 0 : current + 1)
    }
    const prevSlide = (e) => {
        e.preventDefault()
        setCurrent(current === 0 ? data.length - 1 : current - 1)
    }
    return (
        <>
            {
                data &&
                <div className="carousel">
                    <img className='cover' src={data[current]} alt="" />
                    {
                        data.length > 1 &&
                        <>
                            <button id='carouselRight' onClick={e => { nextSlide(e) }}>
                                <img src={arrow_right} alt="arrow right" />
                            </button>
                            <button id='carouselLeft' onClick={e => { prevSlide(e) }}>
                                <img src={arrow_left} alt="arrow left" />
                            </button>
                            <div className='carousel_count'>
                                {current + 1}/{data.length}
                            </div>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default Carousel