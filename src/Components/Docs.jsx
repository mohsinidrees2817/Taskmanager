import moment from 'moment/moment';
import React from 'react';


import {Link } from 'react-router-dom';

export const Docs = ({notes,OpenDoc,searchterm}) => {
  




  return notes

  .map(note=>(
    <div key={note.count} onClick={(e)=>OpenDoc(note.count,note.title,note.description,note.time,note.updateddate)}>
      <Link to={`/edittext/${note.count}`}> 
        <div className='mt-8 w-3/4 sm:w-2/4 h-20 p-2 border border-stone-200 bg-[#F7F7F7] mx-auto flex flex-col' >
          <p className='text-xl text-[#333333]'>{note.title}</p>
          <p className='font-thin text-[#333333] italic'>Last Edited:{note.updateddate > 1 ? moment(note.updateddate).fromNow():
          moment(note.time).fromNow()}</p>
        </div>
      </Link> 
    </div>
  ))
}
