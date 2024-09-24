import React from 'react'
import Additem from './Components/AddItem'

const App = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <div className='w-[75vw] flex  flex-col items-center justify-center'>
        <h1 className="font-bold mt-3 text-xl">Server Side Page:</h1>
        <Additem />

      </div>
    </div>
  )
}

export default App;