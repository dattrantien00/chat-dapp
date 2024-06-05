import React, { useContext, useEffect, useState } from 'react'
import Style from "./NavBar.module.css"
import Image from 'next/image';
import Link from 'next/link';
import { ChatAppContext } from '@/Context/ChatAppContext';
import { Model, Error } from '../index'
import images from '../../assets';
// import Style from './NavBar.module.css';
const NavBar = () => {
  const menuItems = [
    {
      menu: "All User",
      link: "alluser",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    {
      menu: "CONTACT",
      link: "/",
    },
    {
      menu: "SETTING",
      link: "/",
    },
    {
      menu: "FAQS",
      link: "/",
    },
    {
      menu: "TERMS OF USE",
      link: "/",
    },
  ];

  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, username, connectWallet, createAccount, error } = useContext(ChatAppContext);


  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt='logo' width={50} height={50}></Image>
        </div>

        <div className={Style.NavBar_box_right}>
          {/* Desktop */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => {
              return (

                <div onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${Style.NavBar_box_right_menu_items} ${active == i + 1 ? Style.active_btn : ""}`}
                >

                  <Link className={Style.NavBar_box_right_menu_items_link} href={el.link}>
                    {el.menu}

                  </Link>
                </div>
              )
            })}
          </div>

          {/* MOBILE */}
          {open && (<div className={Style.mobile_menu}>
            {menuItems.map((el, i) => {
              return (
                <div onClick={() => setActive(i + 1)} key={i + 1}
                  className={`${Style.mobile_menu_items} ${active == i + 1 ? Style.active_btn : ""}`}
                >

                  <Link className={Style.mobile_menu_items_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              )
            })}
            <p className={Style.mobile_menu_btn}>
              <Image src={images.close} alt="close" width={50} height={50} onClick={() => setOpen(false)}></Image>
            </p>
          </div>)}



          {/* CONNECT WALLET*/}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                <span> Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                <Image src={username ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20} ></Image>
                {''}
                
                <small>{username || "Create Account"}</small>
              </button>
            )}
          </div>

          <div
            className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}>
            <Image src={images.open} alt="open" width={30} height={30}></Image>
          </div>
        </div>
      </div>

      {/*MODEL COMPONENT*/}
      {openModel && (
        <div className={Style.modelBox}>
          <Model openBox={setOpenModel}
            title="WELCOME TO"
            head="CHAT APP"
            info="ancncasc"
            smallInfo="Select your name..."
            image={images.hero}
            functionName={createAccount}
            address={account}
          />

        </div>
      )}

      {error == "" ? "" : <Error error={error}></Error>}
    </div>
  )
}

export default NavBar 