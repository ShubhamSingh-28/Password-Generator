import { useCallback, useEffect, useRef, useState } from 'react'
function App() {
  const[length,setlength] = useState(8)
  const[numbers, setnumbers] = useState(false)
  const[characters, setcharacters] = useState(false)
  const[password, setpassword] = useState("")

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numbers) str +=  "0123456789"
    
    if (characters) str += "<>{}()!@#$%^&*~"
    
    for (let index = 1; index < length; index++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char) 
      
    }
    setpassword(pass)
  
  }, [length, numbers, characters, setpassword])

  const passwordRef = useRef(null)

  useEffect(() => {
    passwordGenerator()
  },[length, numbers, characters, passwordGenerator])

  const copypassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
    <h1 className=' text-center  text-2xl my-3 text-white'>Password Generator</h1>
   <div className=" flex rounded-lg  shadow overflow-hidden mb-4">
    <input
    ref={passwordRef}
    className="outline-none w-full py-1 px-3"
    value={password}
    placeholder='Password'
    readOnly
    type="text" />

    <button
    onClick={copypassword}
     className=' outline-none text-white py-0.5 px-3 text-2xl  shrink-0 bg-blue-900'>
      Copy</button>
   </div>

   <div className=' flex gap-x-2 text-sm'>
   <div className=' flex items-center gap-x-1'>
    <input
    onChange={(e)=>{setlength(e.target.value)}}
     type="range"
     min={6}
     max={100}
     value={length}
     className=' cursor-pointer'
     />
     <label>length:{length}</label>
   </div>
   <div className=' flex items-center gap-x-1'>
    <input 
    onChange={()=>{ setnumbers((prev) => (!prev));
    }}
    type="checkbox" 
    defaultChecked={numbers}
    id='NumberInput'
     />
     <label htmlFor="NumberInput">Numbers</label>
   </div>
   <div className=' flex items-center gap-x-1'>
    <input
    onChange={()=>{setcharacters((prev)=>(!prev))}}
     type="checkbox" 
    defaultChecked={characters}
    id="CharacterInput" />
    <label htmlFor="CharacterInput">Characters</label>
   </div>
   </div>
   </div>
  )
}

export default App
