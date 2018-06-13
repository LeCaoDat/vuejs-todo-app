import axios from 'axios'

const TODO_URL = 'http://localhost:3000/api/'

export default {
  getTodoList () {
    return axios.get(TODO_URL + 'tasks')
      .then(response => response.data)
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
        console.log(error.config)
        return []
      })
  }
}
