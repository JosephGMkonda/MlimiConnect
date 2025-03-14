import React from 'react'
import Menu from './Menu'
function LeftBar() {
  return (
    <div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex-col gap-6 max-md:hidden ">
     
     <div className="font-bold text-2xl text-white">MlimiConnect</div>

     <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 item-center text-light-1 mt-4">
        <div className="flex flex-col items-center">
         <img 
       src="/UserImage.jpg" 
      alt="Profile" 
    className="w-10 h-10 rounded-full border-4 border-white" 
  />
  <p className="mt-1 text-white">ChikondiBanda</p>
  </div>
 </div>  
    <div className="flex text-white justify-between ">
        <div className="flex flex-col items-center m-2">
            <p>1</p>
            <p>Posts</p>
        </div>
        <div className="flex flex-col items-center  m-2 ">
            <p>1</p>
            <p>Follow</p>
        </div>
        <div className="flex flex-col items-center  m-2">
            <p>5</p>
            <p>Following</p>
        </div>
    </div>

      <hr className="text-white"/>
      <Menu/>
      <hr className="text-white"/>

     </div>


    </div>
  )
}

export default LeftBar