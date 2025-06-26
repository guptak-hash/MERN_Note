import { MdAdd } from "react-icons/md"
import NoteCard from "../../components/NoteCard/NoteCard"
import { useEffect, useState } from "react"
import Modal from 'react-modal'
import AddEditNote from "./AddEditNote"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function HomePage() {
    const { currentUser, loading, errorDispatch } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null
    })
    console.log('HomePage currentUser >> ', currentUser)
    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
    }, [])

    if(loading) return (<p>Loading .......</p>)
    return (
        <>
            <div className="container mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
                    <NoteCard content={'You know nothing Jon Snow'} tags={'GOT'} title={"Jon Snow"} date={'26-June-2025'} />
                    <NoteCard content={'You know nothing Jon Snow'} tags={'GOT'} title={"Jon Snow"} date={'26-June-2025'} />
                    <NoteCard content={'You know nothing Jon Snow'} tags={'GOT'} title={"Jon Snow"} date={'26-June-2025'} />
                    <NoteCard content={'You know nothing Jon Snow'} tags={'GOT'} title={"Jon Snow"} date={'26-June-2025'} />
                    <NoteCard content={'You know nothing Jon Snow'} tags={'GOT'} title={"Jon Snow"} date={'26-June-2025'} />
                    <NoteCard content={'You know nothing Jon Snow'} tags={'GOT'} title={"Jon Snow"} date={'26-June-2025'} />
                    <NoteCard content={'You know nothing Jon Snow'} tags={'GOT'} title={"Jon Snow"} date={'26-June-2025'} />
                    <NoteCard content={'You know nothing Jon Snow'} tags={'GOT'} title={"Jon Snow"} date={'26-June-2025'} />
                </div>
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
                    type={openAddEditModal.type} />
            </Modal>
        </>
    )
}

export default HomePage