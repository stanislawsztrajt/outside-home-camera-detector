import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CameraDetector from './features/camera-detector'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CameraDetector />
    </>
  )
}

export default App
