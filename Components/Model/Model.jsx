import React, { useState, useContext } from 'react';
import images from '../../assets';
import Image from 'next/image';
import Style from "./Model.module.css";
import { ChatAppContext } from '@/Context/ChatAppContext';
import { Loader } from "../../Components/index";

const Model = ({ openBox, title, head, info, smallInfo, image, functionName, address }) => {
  const [name, setName] = useState('');
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppContext);

  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="Buddy" height={700} width={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>{title} <span> {head} </span></h1>
          <p> {info} </p>
          <small>{smallInfo}</small>

          {loading ? (
            <Loader />
          ) : (
            <div className={Style.Model_box_right_name}>
              <div className={Style.Model_box_right_name_info}>
                <Image src={images.username} alt="user" height={30} width={30} />
                <input
                  type='text'
                  placeholder='your name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={Style.Model_box_right_name_info}>
                <Image src={images.account} alt="user" height={30} width={30} />
                <input
                  type='text'
                  placeholder={address || "Enter your address.."}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>

              <div className={Style.Model_box_right_name_btn}>
                <button onClick={() => {
                  console.log(functionName);
                  // console.log("Name inside onClick:", name);
                  functionName({name, accountAddress});
                }}>
                  <Image src={images.send} alt="send" width={30} height={30} />
                  Submit
                </button>
                <button onClick={() => openBox(false)}>
                  <Image src={images.close} alt="close" width={30} height={30} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Model;
