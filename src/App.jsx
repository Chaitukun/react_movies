import React from 'react'
import { useState } from 'react'
import Search from './components/Search'
const App = () => {
  const [searchTerm,setSearchTerm] = useState('');
  return (
    <main>
      <div className="pattern " />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero section" />
          <h1>
             Find <span className='text-gradient'> Movies </span> you will enjoy without hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <h1 className="text-white">{searchTerm}</h1>
        </div>
    </main>
  )
}

export default App
