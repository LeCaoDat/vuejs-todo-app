export const tasksDone = state => state.tasks.filter(task => task.is_done)
export const tasksNotDone = state => state.tasks.filter(task => !task.is_done)
export const taskNotDoneCount = (state, getters) => getters.tasksNotDone.length
