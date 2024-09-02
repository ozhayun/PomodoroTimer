import React, { useState, useRef, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddTask from './AddTask';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

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

    const handleDelete = (e, id) => {
        e.stopPropagation();
        const taskElement = document.getElementById(`task-${id}`);
        taskElement.style.transition = 'opacity 0.4s, transform 0.4s';
        taskElement.style.opacity = '0';
        taskElement.style.transform = 'translateX(100%)';
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
        <div className='min-h-screen bg-gradient-to-t lg:w-1/4 from-cyan-500 to-blue-500'>
            <div className='flex flex-col mt-10 lg:mt-48'>
                <p className=''>
                    <strong className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#c7726a] to-yellow-400 ml-7'>
                        Tasks
                    </strong>
                    <span className='ml-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-[#c7726a]'>
                        {tasks.length}
                    </span>
                </p>

                <div className='flex flex-col items-center justify-center'>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="tasks" direction='vertical'>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='flex flex-col items-center justify-center w-full'>
                                    {tasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                            {(provided) => (
                                                <div
                                                    id={`task-${task.id}`}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    key={task.id}
                                                    className={`flex flex-col w-5/6 p-4 m-0.5 ${task.isFinished ? 'bg-[#deddeb]' : 'bg-white'} rounded-lg shadow-md`}
                                                    onMouseEnter={() => setHoveredTaskId(task.id)}
                                                    onMouseLeave={() => setHoveredTaskId(null)}
                                                >
                                                    <div className="flex items-center w-full">
                                                        <IconButton
                                                            onClick={() => handleTaskDone(task.id)}
                                                            size="small"
                                                            onMouseEnter={() => setHoveredTaskDoneId(task.id)}
                                                            onMouseLeave={() => setHoveredTaskDoneId(null)}
                                                            className="flex-shrink-0"
                                                        >
                                                            {task.isFinished ? (
                                                                <CheckCircleOutlineIcon color="primary" />
                                                            ) : hoveredTaskDoneId === task.id ? (
                                                                <CheckCircleOutlineIcon color="action" />
                                                            ) : (
                                                                <RadioButtonUncheckedIcon />
                                                            )}
                                                        </IconButton>
                                                        <div className="flex-grow mx-2 overflow-hidden">
                                                            {editingTaskId === task.id ? (
                                                                <textarea
                                                                    name="Edit Task"
                                                                    maxLength="500"
                                                                    id="Edit Task"
                                                                    ref={editInputRef}
                                                                    rows="1"
                                                                    value={editedDescription}
                                                                    onChange={(e) => setEditedDescription(e.target.value)}
                                                                    className="w-full p-2 overflow-hidden whitespace-pre-wrap border rounded resize-none focus:outline-none"
                                                                    onBlur={handleEditSave}
                                                                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleEditSave()}
                                                                />
                                                            ) : (
                                                                <p className={`text-sm truncate ${task.isFinished ? 'line-through text-gray-500' : ''}`}>
                                                                    {task.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="flex-shrink-0 ml-2">
                                                            {hoveredTaskId === task.id && editingTaskId !== task.id && (
                                                                <>
                                                                    <IconButton onClick={(e) => handleDelete(e, task.id)}>
                                                                        <DeleteIcon fontSize='small' />
                                                                    </IconButton>
                                                                    <IconButton onClick={(e) => handleEdit(e, task.id)}>
                                                                        <EditIcon fontSize='small' />
                                                                    </IconButton>
                                                                </>
                                                            )}
                                                            {editingTaskId === task.id && (
                                                                <IconButton onClick={handleEditSave}>
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
                            className="w-5/6 p-4 m-2 font-bold text-left bg-white rounded-lg shadow-md"
                            onClick={() => setIsAddingTask(true)}
                        >
                            <strong className='text-xl'>+</strong> Add Task
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Tasks;