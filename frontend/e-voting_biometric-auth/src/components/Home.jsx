import React from 'react'
import Navbar from './Navbar'
import Carousel from './Home/Carousel'
import Body from './Home/Body'
import Footer from './Home/Footer'

const Home = () => {
  return (
    <div className='container-fluid g-0'>
      <Navbar/>
      <Carousel/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default Home
