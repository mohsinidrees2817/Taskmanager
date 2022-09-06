import moment from "moment/moment";
import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { Link, useParams } from "react-router-dom";





const Edittext = ({
  notes,
  setNotes,
  title,
  setTitle,
  description,
  setDescription,
  count,
  deletenote,
  update,
  isEdititem,
  setisEdititem,
  sorting,
  Option,
  OpenDoc
}) => {

  let { id } = useParams();
  console.log('aa',id);
  const [dateupdated, setdateupdated] = useState('');

  useEffect(()=>{
   const note = id && notes?.find((elem) => {
      if (elem.count == id) {
        // console.log('hiii',elem,'isEdititem',isEdititem)        
        setdateupdated(moment(elem.updateddate==0?elem.time:elem.updateddate).fromNow());   
      }
      return elem.count == id
    })
    note && OpenDoc(note.count,note.title,note.description,note.time,note.updateddate)
  },[notes,id])

  function generateId() {
    return Math.random().toString(36).substring(2) +
      (new Date()).getTime().toString(36);
  }

  function Addnotes() {
    if (!title) {
    } else if (title && !update) {
      let editednote = notes.map((elem) => {
          if (elem.count == isEdititem) {
            console.log(elem.updateddate,'elem.updateddate')
            setdateupdated(elem.updateddate);                  
            return { ...elem, title, description, updateddate: new Date() };
          }
          return elem;
        }
        )
      editednote.sort((a, b) => {
        return ((b.updateddate > a.updateddate)?1:-1)
      });
      setNotes(editednote);
      sorting(Option);   
      localStorage.setItem("notes", JSON.stringify([...editednote]));
      setTitle("");
      setDescription("");
      setisEdititem(null);
    } else {
      let note = {
        title,
        description,
        count: generateId(),
        time: new Date(),
        updateddate: 0, 
      };
      setNotes([...notes, note]);
      localStorage.setItem("notes", JSON.stringify([...notes, note]));
      setTitle("");
      setDescription("");
    }
  }

  function changestates(e){
    setTitle('');
    setDescription('');
  }



  return (
    <div>
      <div className=" w-full mx-auto bg-[#F7F7F7] p-2 pl- border border-stone-200">
        <div className="flex flex-col gap-4 sm:flex-row justify-between w-2/4 mx-auto">
          <div onClick={(e)=>changestates(e)}>
          <Link to="/">
            <p className="underline">Home</p>
          </Link>
          </div>
          {!update ? <p>Edited: {dateupdated}</p> : <></>}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          name="heading"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type a note title"
          className="mt-8 w-3/4 sm:w-2/4 h-12 p-2 rounded border border-stone-200"
        />
        <textarea
          type="text"
          name="details"
          placeholder="Type the note body"
          className="mt-8 font-light p-2 w-3/4 sm:w-2/4 border  border-stone-200 min-h-[15rem]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-4 justify-between items-center mx-auto w-2/4 mt-8">
        <div onClick={() => deletenote(count)}>
          <Link to="/">
            <button className="mx-auto bg-[#888888] border-2 border-[#717171] text-black ">
              {" "}
              Remove Note
            </button>
          </Link>
        </div>

        <div>
          {update ? (
            <div onClick={(e) => Addnotes(e)}>
              <Link to="/">
                <button className="mx-auto bg-[#888888] border-2 border-[#717171] text-black ">
                  {" "}
                  Add Note
                </button>
              </Link>
            </div>
          ) : (
            <div onClick={(e) => Addnotes(e)}>
              <Link to="/">
                <button className="mx-auto bg-[#888888] border-2 border-[#717171] text-black ">
                  {" "}
                  Update Note
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edittext;
