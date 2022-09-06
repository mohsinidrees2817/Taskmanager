import React from 'react'

import {Link } from 'react-router-dom';

import { Docs } from './Docs';






const Home = ({notes,OpenDoc,setUpdate,Option,setOption,searchterm,setsearchterm}) => {



  return (
    <div className='w-full'>
        <div className=' w-full mx-auto bg-[#F7F7F7] p-2 pl- border border-stone-200'>
            <div className='flex flex-col gap-4 sm:gap-2 w-2/4 mx-auto sm:flex-row'>
            <input type="search" value = {searchterm}  onChange={(e)=>setsearchterm(e.target.value)}  placeholder='Filter notes' className='h-8 rounded px-2 font-light border border-stone-200' />
            <select id="filter-by" value={Option} onChange={(e)=>setOption(e.target.value)}  className='h-8 border'>
            <option value="updateddate">Sort by last edited</option>
            <option value="title">Sort by alphabetically</option>
            <option value="time">Sort by recently created</option>
            </select>
            </div>
        </div>
        <div>
            {notes.length>0 && <>
            <div>
              <Docs notes = {notes} OpenDoc= {OpenDoc}/>
            </div>
            </>}
             {notes.length < 1 && <p className='text-center p-8'> No notes to Show</p>}
        </div>



        <div>
        <div className='mx-auto w-2/4' onClick={(e)=>setUpdate(true)}>
         <Link to="/edittext/:id"> 
        <button className='mx-auto mt-4 bg-[#43799c] w-24 h-10 text-white border-b-2 border-[#396684]' > Create Note</button>
        </Link>  
        </div>
        </div>  
    </div>
  )
}

export default Home