import axios from 'axios'

const TODO_URL = 'http://localhost:3000/api/'

export default {
  getTodoList () {
    return new Promise(
      (resolve, reject) => {
        axios.get(TODO_URL + 'tasks').then(response => resolve(response.data), reject)
      }
    )
  },
  createTask (task) {
    return new Promise(
      (resolve, reject) => {
        axios.post(TODO_URL + 'tasks', {task: task}).then(response => resolve(response.data), reject)
      }
    )
  },
  setDone (task) {
    return new Promise(
      (resolve, reject) => {
        axios.put(`${TODO_URL}tasks/${task.id}`, {task: {is_done: true}}).then(response => resolve(response.data), reject)
      }
    )
  },
  deleteTask (task) {
    return new Promise(
      (resolve, reject) => {
        axios.delete(`${TODO_URL}tasks/${task.id}`).then(response => resolve(response.data), reject)
      }
    )
  },
  updateTask (task) {
    return new Promise(
      (resolve, reject) => {
        axios.put(`${TODO_URL}tasks/${task.id}`, {task: task}).then(response => resolve(response.data), reject)
      }
    )
  }
}
