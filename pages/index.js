import React, { useState, useEffect, useContext } from 'react'
import { ChatAppContext } from '@/Context/ChatAppContext'

const ChapApp = () => {
  const { title } = useContext(ChatAppContext)
  return (
    <div>{title}</div>
  )
}

export default ChapApp