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
        <div className='w-5/6 p-4 mt-0.5 bg-white rounded-lg'>
            <textarea className="w-full p-2 overflow-hidden whitespace-pre-wrap border rounded resize-none focus:outline-none"
                value={description}
                name="New Task"
                row="1"
                maxLength="500"
                id="New Task"
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Task description' />
            <div className='flex flex-row items-start justify-start'>
                <button className='w-1/4 m-2 text-white bg-blue-600 rounded-lg' onClick={handleSave}>
                    {initialDescription ? 'Update' : 'Save'}</button>
                <button className='w-1/4 m-2 text-black rounded-md hover:bg-sky-100' onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )


}


export default AddTask;