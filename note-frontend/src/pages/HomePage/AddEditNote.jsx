import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import TagInput from '../../components/input/TagInput';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddEditNote({ onClose, noteData, type, getAllNotes }) {
    const [title, setTitle] = useState(type === 'add' ? '' : noteData?.title || '');
    const [content, setContent] = useState(type === 'add' ? '' : noteData?.content || '');
    const [tags, setTags] = useState(type === 'add' ? [] : noteData?.tags || []);
    const [error, setError] = useState(null);
    console.log(' Edit noteData >> ', noteData)
    const editNote = async () => {
        try {
            const res = await axios.put('https://mern-note-backend-v5wx.onrender.com/api/note'+noteData._id,
                { title, content, tags },
                { withCredentials: true }
            );
            if (res.data.success === false) {
                console.log(res.data.message);
                setError(res.data.message);
                toast.error(res.data.message)
                return
            }
            toast.success(res.data.message)
            getAllNotes()
            onClose()
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
            setError(error.message)
        }
    }
    const addNewNote = async () => {
        try {
            const res = await axios.post('https://mern-note-backend-v5wx.onrender.com/api/note',
                { title, content, tags },
                { withCredentials: true }
            );
            if (res.data.success === false) {
                console.log(res.data.message);
                setError(res.data.message);
                toast.error(res.data.message)
                return
            }
            toast.success(res.data.message)
            getAllNotes()
            onClose()
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
            setError(error.message)
        }
    }
    const handleAddNote = () => {
        if (!title) {
            setError('Please enter the title')
            return
        };
        if (!content) {
            setError('Please enter the content');
            return
        }
        if (type === 'edit') {
            editNote()
        } else {
            addNewNote()
        }
    }

    return (
        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center
        justify-center absolute -top-3 -right-3 hover:bg-slate-50'
                onClick={onClose}>
                <MdClose className='text-xl text-slate-400' />
            </button>
            <div className='flex flex-col gap-2'>
                <label className='input-label text-red-400 uppercase'>Title</label>
                <input type='text' className='text-2xl text-slate-950 outline-none'
                    placeholder='Wake up at 6 am'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label text-red-400 uppercase'>Content</label>
                <textarea type='text'
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                    placeholder='Content...'
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <div className='mt-3'>
                <label className='label-input text-red-400 uppercase'>tags</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>
            {
                error && <p className='text-red-500 text-xs pt-4'>{error}</p>
            }
            <button className='btn-primary font-medium mt-5 p-3'
                onClick={handleAddNote}>ADD</button>
        </div>
    )
}

export default AddEditNote