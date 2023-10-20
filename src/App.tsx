
import React, { useState } from 'react'
import styles from './App.module.css'

//Components imports
import TaskForm from "./components/TaskForm"
import Footer from "./components/Footer"
import TaskList from "./components/TaskList"
import Header from "./components/Header"


import { ITask } from './interfaces/Task'
import Modal from './components/Modal'

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpadate, setTaskToUpadate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector('#modal')
    if (display) {
      modal!.classList.remove('hide')
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true)
    setTaskToUpadate(task)
  }

  const updadeTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = { id, title, difficulty }

    const updatedItem = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItem)

    hideOrShowModal(false)

  }


  return (
    <div>
      <Modal children={<TaskForm
        btnText='Editar tarefa'
        taskList={taskList}
        task={taskToUpadate}
        handleUpdate={updadeTask}
      />} />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm
            btnText='Criar Tarefa'
            taskList={taskList}
            setTaskList={setTaskList}


          />
        </div>
        <div>
          <h2>Suas tarefas</h2>
          <TaskList
            taskList={taskList}
            deleteTask={deleteTask}
            editTask={editTask}

          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
