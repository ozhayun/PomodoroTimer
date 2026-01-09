import React, { useState, useRef, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddTask from './AddTask';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

const whooshAudio = new Audio('/sounds/whoosh.mp3');

export const Tasks = () => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [hoveredTaskDoneId, setHoveredTaskDoneId] = useState(null);
    const [hoveredTaskId, setHoveredTaskId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [tasks, setTasks] = useState([
        { id: 1, description: 'Description for task 1', isFinished: false },
        { id: 2, description: 'Description for task 2', isFinished: false },
        { id: 3, description: 'Description for task 3', isFinished: false }
    ]);
    const editInputRef = useRef(null);

    useEffect(() => {
        if (editingTaskId && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingTaskId]);

    const handleSaveTask = (description) => {
        const newTask = {
            id: Date.now(),
            description,
            isFinished: false
        };
        setTasks([...tasks, newTask]);
        setIsAddingTask(false);
    };

    const handleCancelAddTask = () => {
        setIsAddingTask(false);
    };

    const handleTaskDone = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, isFinished: !task.isFinished } : task
        ));
    };

    const playWhoosh = () => {
        whooshAudio.playbackRate = 1.5;
        whooshAudio.volume = 0.8;
        whooshAudio.play().catch(error => console.error("Error playing sound:", error));
    }

    const deleteTransition = (id) => {
        const taskElement = document.getElementById(`task-${id}`);
        taskElement.style.transition = 'opacity 0.4s, transform 0.4s';
        taskElement.style.opacity = '0';
        taskElement.style.transform = 'translateX(100%)';
    }

    const handleDelete = (e, id) => {
        e.stopPropagation();
        deleteTransition(id);
        playWhoosh();
        setTimeout(() => {
            setTasks(tasks.filter((task) => task.id !== id));
        }, 400);
    }

    const handleEdit = (e, id) => {
        e.stopPropagation();
        setEditingTaskId(id);
        setEditedDescription(tasks.find(task => task.id === id).description);
    }

    const handleEditSave = () => {
        setTasks(tasks.map(task =>
            task.id === editingTaskId ? { ...task, description: editedDescription } : task
        ));
        setEditingTaskId(null);
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedTasks = Array.from(tasks);
        const [removed] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, removed);

        setTasks(reorderedTasks);
    }

    return (
        <div className='px-4 py-8 lg:min-h-screen lg:w-1/4 lg:px-6'>
            <div className='flex flex-col lg:mt-8'>
                <p className='flex justify-center items-center mb-6'>
                    <strong className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>
                        Tasks
                    </strong>
                    <span className='ml-3 text-3xl font-medium text-slate-600 dark:text-slate-300'>
                        {tasks.length}
                    </span>
                </p>

                <div className='flex flex-col justify-center items-center'>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="tasks" direction='vertical'>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='flex flex-col justify-center items-center w-full'>
                                    {tasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                            {(provided) => (
                                                <div
                                                    id={`task-${task.id}`}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    key={task.id}
                                                    className={`flex flex-col w-5/6 p-4 mb-2 glass-card rounded-xl transition-all duration-200 ${task.isFinished ? 'opacity-70' : ''}`}
                                                    onMouseEnter={() => setHoveredTaskId(task.id)}
                                                    onMouseLeave={() => setHoveredTaskId(null)}
                                                >
                                                    <div className="flex items-center w-full">
                                                        <IconButton
                                                            onClick={() => handleTaskDone(task.id)}
                                                            size="small"
                                                            onMouseEnter={() => setHoveredTaskDoneId(task.id)}
                                                            onMouseLeave={() => setHoveredTaskDoneId(null)}
                                                            className="flex-shrink-0 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
                                                        >
                                                            {task.isFinished ? (
                                                                <CheckCircleOutlineIcon className="text-slate-600 dark:text-slate-300" />
                                                            ) : hoveredTaskDoneId === task.id ? (
                                                                <CheckCircleOutlineIcon className="text-slate-500 dark:text-slate-400" />
                                                            ) : (
                                                                <RadioButtonUncheckedIcon className="text-slate-400 dark:text-slate-500" />
                                                            )}
                                                        </IconButton>
                                                        <div className="overflow-hidden flex-grow mx-2">
                                                            {editingTaskId === task.id ? (
                                                                <textarea
                                                                    name="Edit Task"
                                                                    maxLength="500"
                                                                    id="Edit Task"
                                                                    ref={editInputRef}
                                                                    rows="1"
                                                                    value={editedDescription}
                                                                    onChange={(e) => setEditedDescription(e.target.value)}
                                                                    className="overflow-hidden p-2 w-full text-sm whitespace-pre-wrap rounded-lg resize-none glass-button focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-300 focus:ring-opacity-50 text-slate-800 dark:text-slate-100"
                                                                    onBlur={handleEditSave}
                                                                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleEditSave()}
                                                                />
                                                            ) : (
                                                                <p className={`text-sm truncate text-slate-700 dark:text-slate-200 ${task.isFinished ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                                                                    {task.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="flex-shrink-0 ml-2">
                                                            {hoveredTaskId === task.id && editingTaskId !== task.id && (
                                                                <>
                                                                    <IconButton 
                                                                        onClick={(e) => handleDelete(e, task.id)}
                                                                        className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400"
                                                                    >
                                                                        <DeleteIcon fontSize='small' />
                                                                    </IconButton>
                                                                    <IconButton 
                                                                        onClick={(e) => handleEdit(e, task.id)}
                                                                        className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                                                                    >
                                                                        <EditIcon fontSize='small' />
                                                                    </IconButton>
                                                                </>
                                                            )}
                                                            {editingTaskId === task.id && (
                                                                <IconButton 
                                                                    onClick={handleEditSave}
                                                                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                                                                >
                                                                    <DoneIcon fontSize='small' />
                                                                </IconButton>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {isAddingTask ? (
                        <AddTask onSave={handleSaveTask} onCancel={handleCancelAddTask} />
                    ) : (
                        <button
                            className="p-4 m-2 w-5/6 font-medium text-left rounded-xl transition-all duration-200 glass-button text-slate-800 dark:text-slate-100"
                            onClick={() => setIsAddingTask(true)}
                        >
                            <strong className='mr-2 text-xl'>+</strong> Add Task
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Tasks;