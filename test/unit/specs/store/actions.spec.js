import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { testAction } from './test-utils'
import * as actions from '@/store/actions'
let mock = new MockAdapter(axios)

describe('actions', () => {
  beforeEach(function() {
    mock.reset()
  })

  it('getListTodo', (done) => {
    const response = [
      {id: 1, content: 'Do sth', is_done: false},
      {id: 2, content: 'Do sth else', is_done: true}
    ]
    mock.onGet('http://localhost:3000/api/tasks').reply(200, response)
    testAction(actions.getListTodo, null, {}, [{type: 'setListTodo', payload: response}], done)
  })

  it('getListTodo get Error', (done) => {
    mock.onGet('http://localhost:3000/api/tasks').networkError()
    testAction(actions.getListTodo, null, {}, [{type: 'addError', payload: 'Network Error'}], done)
  })

  it('addTask', (done) => {
    const task = {id: 1, content: 'Do sth', is_done: false}
    mock.onPost('http://localhost:3000/api/tasks', {task: task}).reply(200, task)
    testAction(actions.addTask, task, {}, [{ type: 'addTask', payload: task }], done)
  })

  it('addTask get Error', (done) => {
    const task = {id: 1, content: 'Do sth', is_done: false}
    mock.onPost('http://localhost:3000/api/tasks', {task: task}).networkError()
    testAction(actions.addTask, task, {}, [{ type: 'addError', payload: 'Network Error' }], done)
  })

  it('updateTask', (done) => {
    const task = {id: 1, content: 'Do sth', is_done: false}
    const updatedTask = {id: 1, content: 'new', is_done: false}
    const payload = {task: task, content: 'new'}
    const expectedMutations = [
      {
        type: 'updateTask',
        payload: payload
      }
    ]
    mock.onPut(`http://localhost:3000/api/tasks/${task.id}`).reply(200, updatedTask)
    testAction(actions.updateTask, payload, {}, expectedMutations, done)
  })

  it('updateTask get Error', (done) => {
    const task = {id: 1, content: 'Do sth', is_done: false}
    const payload = {task: task, content: 'new'}
    const expectedMutations = [
      {
        type: 'addError',
        payload: 'Network Error'
      }
    ]
    mock.onPut(`http://localhost:3000/api/tasks/${task.id}`).networkError()
    testAction(actions.updateTask, payload, {}, expectedMutations, done)
  })

  it('setDoneTask', (done) => {
    const task = {id: 1, content: 'Do sth', is_done: false}
    const doneTask = {id: 1, content: 'new', is_done: true}
    const expectedMutations = [
      {
        type: 'setDoneTask',
        payload: task
      }
    ]
    mock.onPut(`http://localhost:3000/api/tasks/${task.id}`).reply(200, doneTask)
    testAction(actions.setDoneTask, task, {}, expectedMutations, done)
  })

  it('setDoneTask get Error', (done) => {
    const task = {id: 1, content: 'Do sth', is_done: false}
    const expectedMutations = [
      {
        type: 'addError',
        payload: 'Network Error'
      }
    ]
    mock.onPut(`http://localhost:3000/api/tasks/${task.id}`).networkError()
    testAction(actions.setDoneTask, task, {}, expectedMutations, done)
  })

  it('deleteTask', (done) => {
    const task = {id: 1, content: 'Do sth', is_done: false}
    const expectedMutations = [
      {
        type: 'deleteTask',
        payload: task
      }
    ]
    mock.onDelete(`http://localhost:3000/api/tasks/${task.id}`).reply(200, {})
    testAction(actions.deleteTask, task, {}, expectedMutations, done)
  })

  it('deleteTask', (done) => {
    const task = {id: 1, content: 'Do sth', is_done: false}
    const expectedMutations = [
      {
        type: 'addError',
        payload: 'Network Error'
      }
    ]
    mock.onDelete(`http://localhost:3000/api/tasks/${task.id}`).networkError()
    testAction(actions.deleteTask, task, {}, expectedMutations, done)
  })
})
