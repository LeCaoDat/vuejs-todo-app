import * as mutations from '@/store/mutations'
import {expect} from 'chai'

describe('mutations', () => {
  const state = {
    tasks: [],
    errors: []
  }
  const task = {id: 2, content: 'Do sth else', is_done: false}
  const error = 'Error'

  it('setListTodo', () => {
    const tasks = [{id: 1, content: 'Do sth', is_done: false}]
    mutations.setListTodo(state, tasks)
    expect(state.tasks).to.equal(tasks)
  })

  it('addTask', () => {
    mutations.addTask(state, task)
    expect(state.tasks).to.deep.include(task)
  })

  it('updateTask', () => {
    mutations.updateTask(state, {task: task, content: 'New content'})
    expect(task.content).to.equal('New content')
  })

  it('setDoneTask', () => {
    mutations.setDoneTask(state, task)
    expect(task.is_done).to.equal(true)
  })

  it('deleteTask', () => {
    mutations.deleteTask(state, task)
    expect(state.tasks).not.to.deep.include(task)
  })

  it('addError', () => {
    mutations.addError(state, error)
    expect(state.errors).to.deep.include(error)
  })
})
