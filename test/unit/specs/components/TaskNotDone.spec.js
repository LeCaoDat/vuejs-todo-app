import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TaskNotDone from '@/components/TaskNotDone'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
describe('TaskNotDone', () => {
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
      updateTask: jest.fn(),
      setDoneTask: jest.fn(),
      addError: jest.fn()
    },
    store = new Vuex.Store({
      state,
      actions
    })
  })

  it('should props task not done', () => {
    const wrapper = shallowMount(TaskNotDone, {
      store, localVue,
      propsData: {
        task: state.tasks[0]
      }
    })
    expect(wrapper.vm.task.is_done).toBe(false)
  })

  it('should render correct content', () => {
    const wrapper = shallowMount(TaskNotDone, {
      store, localVue,
      propsData: {
        task: state.tasks[0]
      }
    })
    expect(wrapper.html()).toContain(state.tasks[0].content)
  })

  it('should dispacthes "setDoneTask" when click button done', () => {
    const wrapper = shallowMount(TaskNotDone, {
      store, localVue,
      propsData: {
        task: state.tasks[0]
      }
    })
    wrapper.find('button.set-done').trigger('click')
    expect(actions.setDoneTask).toHaveBeenCalled()
  })

  it('should show input tag when click button edit', () => {
    const wrapper = shallowMount(TaskNotDone, {
      store, localVue,
      propsData: {
        task: state.tasks[0]
      }
    })
    wrapper.find('button.show-edit').trigger('click')
    expect(wrapper.find('input.form-control').isVisible()).toBe(true)
  })

  it('should show button save when click button edit', () => {
    const wrapper = shallowMount(TaskNotDone, {
      store, localVue,
      propsData: {
        task: state.tasks[0]
      }
    })
    wrapper.find('button.show-edit').trigger('click')
    expect(wrapper.find('button.save-task').isVisible()).toBe(true)
  })

  it('should show button cancel when click button edit', () => {
    const wrapper = shallowMount(TaskNotDone, {
      store, localVue,
      propsData: {
        task: state.tasks[0]
      }
    })
    wrapper.find('button.show-edit').trigger('click')
    expect(wrapper.find('button.cancel').isVisible()).toBe(true)
  })

  it('should dispatches "updateTask" when input valid content and click save', async () => {
    const wrapper = shallowMount(TaskNotDone, {
      store, localVue,
      propsData: {
        task: state.tasks[0]
      }
    })
    wrapper.find('button.show-edit').trigger('click')
    wrapper.find('button.save-task').trigger('click')
    await flushPromises()
    expect(actions.updateTask).toHaveBeenCalled()
  })

  it('should not dispatches "updateTask" when input invalid content and click save', async () => {
    const wrapper = shallowMount(TaskNotDone, {
      store, localVue,
      propsData: {
        task: state.tasks[0]
      }
    })
    wrapper.find('button.show-edit').trigger('click')
    const input = wrapper.find('input.form-control')
    input.element.value = '123'
    input.trigger('input')
    wrapper.find('button.save-task').trigger('click')
    await flushPromises()
    expect(actions.updateTask).not.toHaveBeenCalled()
  })
})
