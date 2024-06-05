import React from 'react'
import images from '../../assets';
import Image from 'next/image';
import Style from "./Error.module.css";
import { ChatAppContext } from '@/Context/ChatAppContext';
import { Loader } from "../../Components/index";

const Error = ({error}) => {
  return (
    <div className={Style.Error}>
      <div className={Style.Error_box}>
        <h1>Please fix This Error & Reload Browser</h1>
        {error}
      </div>
    </div>
  )
}

export default Error