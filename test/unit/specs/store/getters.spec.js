import * as getters from '@/store/getters'
import {expect} from 'chai'

describe('getters', () => {
  const state = {
    tasks: [
      {id: 1, content: 'Do sth', is_done: false},
      {id: 2, content: 'Do sth else', is_done: true}
    ]
  }

  it('tasksDone', () => {
    const result = getters.tasksDone(state)
    expect(result).to.deep.equal([state.tasks[1]])
  })

  it('tasksNotDone', () => {
    const result = getters.tasksNotDone(state)
    expect(result).to.deep.equal([state.tasks[0]])
  })

  it('tasksNotDoneCount', () => {
    const result = getters.tasksNotDoneCount(state, getters)
    expect(result).to.equal(1)
  })
})
