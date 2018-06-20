import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ListTodo from '@/components/ListTodo'
import TaskNotDone from '@/components/TaskNotDone'
import TaskDone from '@/components/TaskDone'
import * as getters from '@/store/getters'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()

localVue.use(Vuex)
describe('ListTodo', () => {
  const state = {
    tasks: [
      {id: 1, content: 'Do sth', is_done: false},
      {id: 2, content: 'Do sth else', is_done: true}
    ],
    errors: []
  }
  let actions
  let store

  beforeEach(() => {
    actions = {
      getListTodo: jest.fn(),
      addTask: jest.fn(),
      addError: jest.fn()
    },
    store = new Vuex.Store({
      state,
      actions,
      getters
    })
  })

  it('should render not done tasks h1', () => {
    const wrapper = shallowMount(ListTodo, { store, localVue })
    expect(wrapper.html())
      .toContain('<h1>Todos</h1>')
  })

  it('should render done tasks h1', () => {
    const wrapper = shallowMount(ListTodo, { store, localVue })
    expect(wrapper.html())
      .toContain('<h1>Already Done</h1>')
  })

  it('should dispatches "getListTodo" when created', () => {
    const wrapper = shallowMount(ListTodo, { store, localVue })
    expect(actions.getListTodo).toHaveBeenCalled()
  })

  it('should render count not done task', () => {
    const wrapper = shallowMount(ListTodo, { store, localVue })
    expect(wrapper.find('span.count-todos').text()).toEqual(getters.tasksNotDoneCount(state, getters).toString())
  })

  it('should dispatches "addTask" when create task', async () => {
    const wrapper = shallowMount(ListTodo, { store, localVue })
    const input = wrapper.find('input.add-task')
    wrapper.vm.newTask.content = 'Do sth'
    input.trigger('keyup.enter')
    await flushPromises()
    expect(actions.addTask).toHaveBeenCalled()
  })

  it('should not dispatches "addTask" when create invalid task', async () => {
    const wrapper = shallowMount(ListTodo, { store, localVue })
    const input = wrapper.find('input.add-task')
    wrapper.vm.newTask.content = 'Do sth 1'
    input.trigger('keyup.enter')
    await flushPromises()
    expect(actions.addTask).not.toHaveBeenCalled()
  })

  it('should render list task not done', () => {
    const wrapper = shallowMount(ListTodo, {
      store, localVue,
      stubs: {
        'task-not-done': TaskNotDone
      }
    })
    expect(wrapper.findAll('li.row.ui-state-default').length).toEqual(getters.tasksNotDoneCount(state, getters))
  })

  it('should render list task done', () => {
    const wrapper = shallowMount(ListTodo, {
      store, localVue,
      stubs: {
        'task-done': TaskDone
      }
    })
    expect(wrapper.findAll('li.row').length).toEqual(getters.tasksDone(state).length)
  })
})
