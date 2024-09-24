import React, { useState } from 'react'

const Create = () => {
    const [newcollection, setnewcollection] = useState("");
  return (
    <div>
        <input type="text" value={newcollection} onChange={(e)=>e.target.value}/>
        <button>Add new Category</button>
    </div>
  )
}

export default Create