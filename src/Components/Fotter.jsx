import React from 'react'
import Link from '../images/linkedin.png'
import Git from '../images/github.png'


export const Fotter = () => {
  return (
    <div className='div-container-footer'>
        <p style={{marginLeft: 20}} className='p-footer'>Created by <span className='span-footer'>Matias Garrido</span></p>
        <a href='https://www.linkedin.com/in/matias-garridodev/'><img src={Link} className='img-footer' alt='linkedin'/></a>
        <a href="https://github.com/matiasgarrid0"><img src={Git} className='img-footer' alt='github'/></a>
    </div>
  )
}
