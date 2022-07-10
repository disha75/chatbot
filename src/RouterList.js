import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './components/Chats/Chat'
import Home from './components/Home/Home'

export default function RouterList() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='/:id' element={<Home />} />
        </Route>
        <Route path='/:id/:name' element={<Chat />} />
      </Routes>
    </>
  )
}
