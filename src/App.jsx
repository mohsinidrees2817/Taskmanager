import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Edittext from "./Components/Edittext.jsx";
import { BrowserRouter, Route, Routes,useLocation,useParams } from "react-router-dom";
import { useEffect, useState, } from "react";



function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(1);
  const [update, setupdate] = useState(true);
  const [isEdititem, setisEdititem] = useState(null);
  const [searchterm , setsearchterm] = useState('');

  


  const getDataFromL = () => {
    const data = localStorage.getItem("notes");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  useEffect(() => {
    setNotes(getDataFromL())
  }, [])
 
  const OpenDoc = (count) => {
    let Index
    let newedititem = notes.find((elem,i) => {
      if(elem.count === count){
        Index = i
      }
      return elem.count === count;
    });
    console.log(count,'count')
    // const notesInstance = [...notes]
    setupdate(false);
    setTitle(newedititem.title);
    setDescription(newedititem.description);
    setCount(newedititem.count);
    // console.log(newedititem);
    //    const notesInstance = [...notes]
    // newedititem.updateddate = new Date();
    // notesInstance[Index] = newedititem
    // setNotes(notesInstance)
    setisEdititem(count);
  };


  // useEffect(()=>{
  //    sorting(Option)
  //  },[notes])




  

  const deletenote = (count) => {
    const updatedItems = notes.filter((element, index) => {
      localStorage.removeItem([notes.element]);
      return element.count !== count;
    });
    setNotes(updatedItems);
    localStorage.setItem("notes", JSON.stringify([...updatedItems]));
    setTitle("");
    setDescription("");
  };




const [duplicatenotes, setduplicatenotes] = useState(notes);
useEffect(()=>{
    const newuserlist = notes.filter((itemss)=>{
       return itemss.title.toLowerCase().includes(searchterm.toLowerCase());;})
       setduplicatenotes(newuserlist)
       
},[searchterm])



const [Option, setOption] = useState("");  

const sorting = (e)=>{
    if ( e === "title") {
      console.log("title");
      const sortcopy = [...notes];
      sortcopy.sort((a, b) => a.title.localeCompare(b.title));
      setNotes(sortcopy);
      console.log('sorted by alphabetically');
    } 
    else if ( e === "updateddate") {
      console.log("updateddate");
      const sortcopy = [...notes];
      sortcopy.sort((a, b) => {
        return ((b.updateddate > a.updateddate)?1:-1)
      });
      setNotes(sortcopy);
      console.log('sorted by edited');
    }
     else if ( e === "time") {
      console.log('time')
      const sortcopy = [...notes];
      sortcopy.sort((a, b) => {
        return ((b.time > a.time)?1:-1)
      });
      setNotes(sortcopy);
      console.log('sorted by created',sortcopy);
    }
    setOption(e);
  }


  return (
    <div className="p-0 m-0">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                notes={searchterm.length < 1  ? notes : duplicatenotes}
                OpenDoc={OpenDoc}
                setUpdate={setupdate}

                Option={Option}
                searchterm={searchterm}
                setsearchterm={setsearchterm}
                duplicatenotes = {duplicatenotes}
                setOption = {sorting}
                setTitle={setTitle}
                setDescription={setDescription}
              />
            }
          />
          <Route
            path="/edittext/:id"
            element={
              <Edittext
              OpenDoc={OpenDoc}
                notes={notes}
                setNotes={setNotes}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                count={count}
                setCount={setCount}
                deletenote={deletenote}
                update={update}
                setUpdate={setupdate}
                isEdititem={isEdititem}
                setisEdititem={setisEdititem}
                searchterm={searchterm}
                sorting = {sorting}
                option = {Option}
                
                
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
