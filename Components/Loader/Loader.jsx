import React from 'react'
import Style from './Loader.module.css'
import images from '../../assets';
import Image from 'next/image';


const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style }>
        <Image src={images.loader} alt="loader" height={100} width={100} />
      </div>
    </div>
  )
}

export default Loader