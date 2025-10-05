import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import { FaHome, FaRegMoon, FaMoon, FaGithub} from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const navigator = useNavigate()
  return (
    <div className = {`min-h-screen h-full min-w-fit w-full font-[Rubik] ${darkMode ? 'border-white text-gray-100 bg-gray-900' : 'border-black text-black bg-gray-100'}`}>
      <div className = 'h-[50px] w-full border-1 relative flex items-center'>
        <button onClick = {() => {navigator("/")}} className = 'cursor-pointer aspect-square ml-[5px] flex items-center h-full'>
          <FaHome className = 'h-1/2 hover:h-3/5 w-full aspect-square'>
          </FaHome>
        </button>
        <button onClick = {() => {window.open('https://github.com/david-man/bse-adcs-website','_blank')}} className = 'h-full min-w-fit cursor-pointer absolute right-[50px] aspect-square mr-[5px] flex items-center'>
          <FaGithub className = 'h-1/2 hover:h-3/5 w-full aspect-square'>
          </FaGithub>
        </button>
        <button onClick = {() => {setDarkMode(!darkMode)}} className = 'h-full min-w-fit cursor-pointer absolute right-0 aspect-square mr-[5px] flex items-center'>
          
          
          {darkMode ? 
            <FaMoon className = 'h-1/2 w-full hover:h-3/5 aspect-square'>
            </FaMoon>
          :
            <FaRegMoon className = 'h-1/2 w-full hover:h-3/5 aspect-square'>
            </FaRegMoon>
          }
        </button>
      </div>
      <div className = ''>
        <Outlet></Outlet>
      </div>
      
    </div>
  )
}

export default App
