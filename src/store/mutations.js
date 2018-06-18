export const setListTodo = (state, tasks) => {
  state.tasks = tasks
}
export const addTask = (state, task) => {
  state.tasks.push(task)
}
export const deleteTask = (state, task) => {
  var index = state.tasks.indexOf(task)
  if (index !== -1) {
    state.tasks.splice(index, 1)
  }
}
export const updateTask = (state, payload) => {
  payload.task.content = payload.content
  payload.hideEdit.call()
}
export const setDoneTask = (state, task) => {
  task.is_done = true
}
export const addError = (state, error) => {
  state.errors.push(error)
}
