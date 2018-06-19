import TodoService from '@/services/todo'
export const getListTodo = (context) => {
  TodoService.getTodoList().then(
    tasks => {
      context.commit('setListTodo', tasks)
    },
    error => { addError(context, error.message) }
  )
}
export const addTask = (context, task) => {
  TodoService.createTask(task)
    .then(
      response => {
        task = {content: ''}
        context.commit('addTask', response)
      },
      error => { addError(context, error.message) }
    )
}
export const deleteTask = (context, task) => {
  TodoService.deleteTask(task).then(
    result => {
      context.commit('deleteTask', task)
    },
    error => {
      addError(context, error.message)
    }
  )
}
export const updateTask = (context, payload) => {
  TodoService.updateTask({id: payload.task.id, content: payload.content}).then(
    task => {
      context.commit('updateTask', payload)
    },
    error => {
      addError(context, error.message)
    }
  )
}
export const setDoneTask = (context, task) => {
  TodoService.setDone(task)
    .then(
      result => {
        context.commit('setDoneTask', task)
      },
      error => {
        addError(context, error.message)
      }
    )
}
export const addError = (context, error) => {
  context.commit('addError', error)
}
