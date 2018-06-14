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
  }
}
