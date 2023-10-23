import { useEffect, useRef, useState } from 'react'

import { useCallback } from 'react'
function App() {
 const [length,setLength]= useState(8)
 const [numAllow,setNumAllow]=useState(false)
 const [charAllow,setCharAllow]=useState(false)
 const [password,setPassword]=useState("")

 //useRef hook
 const passwordRef=useRef(null)


const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numAllow) str+="0123456789"
  if(charAllow) str+="!@#$%&_?"

  for (let i = 1; i <=length; i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }

  setPassword(pass)

},[length,numAllow,charAllow,setPassword])

const copyPassword=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,100); //give range Of Selection Characters for copying
  window.navigator.clipboard.writeText(password)
},[password])
//-----call function------
//***1-method***/
// passwordGenerator()
//***2-method***/
useEffect(()=>{
  passwordGenerator()
},[length,numAllow,charAllow,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center font-bold text-2xl pt-3'>Password generator</h1>
         <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
          <input type='text' value={password} className='outline-none w-full py-1 px-3 my-7 rounded-l-lg' placeholder='password'  readOnly ref={passwordRef}/> 
          <button className='outline-none bg-blue-700 text-white px-3 my-7 py-1 shrink-0 rounded-r-lg hover:bg-blue-900' onClick={copyPassword}>copy</button>
         </div>
         <div className='flex text-sm gap-x-2'>
           <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(event)=>{setLength(event.target.value)}}></input>
            <label htmlFor=''>Length : {length}</label>
           </div>
           <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={numAllow} id='numIp' onChange={()=>{setNumAllow((prev)=>!prev);}}></input>
            <label htmlFor='numIp'>Numbers</label>
           </div>
           <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={charAllow} id='charIp' onChange={()=>{setCharAllow((prev)=>!prev);}}></input>
            <label htmlFor='charIp'>Characters</label>
           </div>
           
         </div>
      </div>
    </>
  )
}

export default App
