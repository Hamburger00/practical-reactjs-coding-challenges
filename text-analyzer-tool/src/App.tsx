import './App.scss'
import React, { useState } from "react";
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <TextArea />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
