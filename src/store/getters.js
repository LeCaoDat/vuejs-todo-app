export const tasksDone = state => state.tasks.filter(task => task.is_done)
export const tasksNotDone = state => state.tasks.filter(task => !task.is_done)
export const tasksNotDoneCount = (state, getters) => getters.tasksNotDone.length
