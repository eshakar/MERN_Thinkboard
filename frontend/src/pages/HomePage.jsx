import Navbar from "../components/NavBar";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import toast from "react-hot-toast";

export default function HomePage(){
  const [notes,setNotes] = useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    api.get("/notes")
      .then(res=>setNotes(res.data))
      .catch(()=>toast.error("Couldn't load notes"))
      .finally(()=>setLoading(false));
  },[]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        {loading ? <div>Loading...</div> :
          notes.length? (
            <div className="grid lg:grid-cols-3 gap-4">
              {notes.map(n=><NoteCard key={n._id} note={n} setNotes={setNotes} />)}
            </div>
          ) : <NotesNotFound />
        }
      </div>
    </div>
  );
}
