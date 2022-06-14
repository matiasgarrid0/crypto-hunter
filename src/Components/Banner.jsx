import React from 'react'
import { Carousel } from './Carousel'

export const Banner = () => {
 
  return (
    <div className='div-banner'>
        <div className='div-titles-banner'>
            <p className='p-title-banner'>Crypto Hunter</p>
            <p className='p-text-banner'>Operamos el mayor intercambio de Bitcion y criptomonedas a nivel mundial en volumen</p>
        </div>
        <div className='div-carousel-banner'>
            <Carousel/>
        </div>
    </div>
  )
}
