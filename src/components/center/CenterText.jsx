import React from 'react'
import HeroText from './HeroText.jsx'
import SubHeading from './SubHeading.jsx' 

const CenterText = () => {
  return (
    <div className='absolute text-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
      <HeroText/>
      <SubHeading/>
      </div>
  )
}

export default CenterText