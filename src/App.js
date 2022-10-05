import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from './components/AddTask';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {

    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getResponseData = async () => {
            const taskData = await fetchData();
            setTasks(taskData);
        }
        getResponseData()
    },[])

    // Fetch Data from API
    const fetchData = async () => {
        const response = await fetch('http://localhost:8000/tasks');
        const responseData = await response.json()
        return responseData
    }

     // Fetch Task from API
     const fetchTask = async (id) => {
        const response = await fetch(`http://localhost:8000/tasks/${id}`)
        const responseData = await response.json()
        return responseData
    }

    // Add Task
    const addTask = async (task) => {

        const response = await fetch(`http://localhost:8000/tasks`,{
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(task)
        });

        const resData = await response.json()
        setTasks([...tasks,resData])

        // const id = (Math.random() * 100) + 1
        // setTasks([...tasks, {id, ...task}])
    }

    // Delete Tasks by id
    const deleteTask = async (id) => {
        await fetch(`http://localhost:8000/tasks/${id}`,{
            method: 'DELETE',
        })
        setTasks(tasks.filter((task) =>  task.id !== id));
    }

    //Toggle Reminder
    const toggleReminder = async (id) => {

        const taskToToggle = await fetchTask(id);
        const updateToggle = {...taskToToggle, reminder: !taskToToggle.reminder}

        const response = await fetch(`http://localhost:8000/tasks/${id}`,{
            method: 'PUT',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(updateToggle)
        }) 

        const data = await response.json()
        setTasks(tasks.map((task) => (
                task.id === id ? (
                    {...task, reminder: data.reminder}
                )
                : task
            )  
        ))
    };

    return (
        <Router>
             <div className='container'>
                <Header 
                onAdd={() => (setShowAddTask(!showAddTask))}
                showAddTask={showAddTask}
                />
                <Routes>
                    <Route
                        path='/'
                        element={
                        <>
                            {
                                showAddTask && <AddTask onAdd={addTask} /> // short form check condition don't need else
                            }
                            {
                                tasks.length > 0 ?(
                                    <Tasks 
                                        tasks={tasks} 
                                        onDelete= {deleteTask}
                                        onToggle= {toggleReminder}
                                        />
                                ):(
                                    'No Tasks To Show'
                                )
                            }
                        </>
                        }
                    />
                    <Route path='/about' element={<About />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    )

}