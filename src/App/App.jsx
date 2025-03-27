import { useState } from 'react'
import './App.scss'
import FoodCart from "../components/FoodCart/FoodCart.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <FoodCart />
  )
}

export default App
