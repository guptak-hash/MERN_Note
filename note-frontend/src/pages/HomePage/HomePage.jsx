import { MdAdd } from "react-icons/md"
import NoteCard from "../../components/NoteCard/NoteCard"
import { useEffect, useState } from "react"
import Modal from 'react-modal'
import AddEditNote from "./AddEditNote"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import api from "../../api/axiosConfig"
import { toast } from "react-toastify"
import EmpthyCard from "./EmpthyCard"
import emptyNote from '../../assets/emptyNote.webp'


function HomePage() {
    const { currentUser, loading, errorDispatch } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [allNotes, setAllNotes] = useState([])
    const [error, setError] = useState(null);
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null
    })
    // console.log('HomePage currentUser >> ', currentUser)
    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        } else {
            getAllNotes()
        }
    }, [])

    const getAllNotes = async () => {
        try {
            const res = await api.get('/api/note');
            if (res.data.success === false) {
                return
            }
            setAllNotes(res.data.notes)
        } catch (error) {
            console.log(error)
        }
    }

    const onPinNote = async (id) => {
        try {
            const res = await api.patch('/api/note/' + id, { isPinned: 'hello' });
            if (res.data.success === false) {
                // toast.error(res.data.message)
                setError(res.data.message);
                return
            }
            getAllNotes()
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await api.delete('/note/' + id)
            if (res.data.success === false) {
                toast.error(res.data.message)
                setError(res.data.message);
                return
            }
            toast.success(res.data.message)
            getAllNotes()
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setError(error.message);
        }
    }
    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, type: 'edit', data: noteDetails })
    }

    if (loading) return (<p>Loading .......</p>)
    return (
        <>
            <div className="container mx-auto">
                {allNotes.length>0 ? (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
                    {
                        allNotes.map(note => (
                            <NoteCard
                                key={note._id}
                                content={note.content}
                                tags={note.tags}
                                title={note.title}
                                date={note.createdAt}
                                isPinned={note.isPinned}
                                onDelete={() => handleDelete(note._id)}
                                onPinNote={() => onPinNote(note._id)}
                                onEdit={() => handleEdit(note)} />
                        ))
                    }
                </div>
                ): <EmpthyCard imgSrc={emptyNote} message={'Ready to capture your idea? Click the "ADD" button to start noting down your thoughts'}/>}
              
            </div>
            <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2B85FF]
    hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() => setOpenAddEditModal({ isShown: true, type: 'add', data: null })}>
                <MdAdd className="text-[32px] text-white" />
            </button>
            <Modal isOpen={openAddEditModal.isShown} onRequestClose={() => { }} style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.2)"
                }
            }}
                contentLabel=""
                className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white
    rounded-md mx-auto mt-14 p-5 overflow-scroll">
                <AddEditNote onClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
                    noteData={openAddEditModal.data}
                    type={openAddEditModal.type}
                    getAllNotes={getAllNotes} />
            </Modal>
        </>
    )
}

export default HomePage