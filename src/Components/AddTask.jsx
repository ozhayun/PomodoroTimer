import React, { useEffect, useState } from 'react'

const AddTask = ({ onSave, onCancel, initialDescription = '' }) => {
    const [description, setDescription] = useState('');

    useEffect(() => {
        setDescription(initialDescription);
    }, [initialDescription]);

    const handleSave = () => {
        if (description.trim()) {
            onSave(description);
            setDescription('');
        }
    }

    return (
        <div className='w-5/6 p-4 mt-0.5 glass-card rounded-xl'>
            <textarea 
                className="w-full p-3 overflow-hidden whitespace-pre-wrap glass-button rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-300 focus:ring-opacity-50 text-slate-800 dark:text-slate-100 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                value={description}
                name="New Task"
                row="1"
                maxLength="500"
                id="New Task"
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Task description' 
            />
            <div className='flex flex-row items-start justify-start mt-3 space-x-2'>
                <button 
                    className='px-4 py-2 glass-button text-slate-800 dark:text-slate-100 rounded-xl font-medium transition-all duration-200' 
                    onClick={handleSave}
                >
                    {initialDescription ? 'Update' : 'Save'}
                </button>
                <button 
                    className='px-4 py-2 glass-button text-slate-800 dark:text-slate-100 rounded-xl font-medium transition-all duration-200' 
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    )


}


export default AddTask;