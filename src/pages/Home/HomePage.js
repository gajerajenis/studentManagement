import React from 'react'
import Header from '../Header/Header'
import Slider from '../Slider/Slider'
import FeatureBoxes from '../FeatureBoxes/FeatureBoxes'
import Gallery from '../Gallery/Gallery'
import Footer from '../Footer/Footer'

const HomePage = () => {
    return (
        <div>
            <Header />
            <Slider />
            <FeatureBoxes />
            <Gallery />
            <Footer />
        </div>
    )
}

export default HomePage