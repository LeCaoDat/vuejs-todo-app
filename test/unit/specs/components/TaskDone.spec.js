import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TaskDone from '@/components/TaskDone'
import Modal from '@/components/modal/Modal'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('TaskDone', () => {
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
      deleteTask: jest.fn(),
      addError: jest.fn()
    },
    store = new Vuex.Store({
      state,
      actions
    })
  })

  it('should prop task done', () => {
    const wrapper = shallowMount(TaskDone, {
      store, localVue,
      propsData: {
        task: state.tasks[1]
      }
    })
    expect(wrapper.vm.task.is_done).toBe(true)
  })

  it('should render correct content', () => {
    const wrapper = shallowMount(TaskDone, {
      store, localVue,
      propsData: {
        task: state.tasks[1]
      }
    })
    expect(wrapper.html()).toContain(state.tasks[1].content)
  })

  it('should dispacthes "deleteTask" when click button delete', () => {
    const wrapper = shallowMount(TaskDone, {
      store, localVue,
      stubs: {
        'modal': Modal
      },
      propsData: {
        task: state.tasks[0]
      }
    })
    wrapper.find('button').trigger('click')
    wrapper.find('button.dg-btn--ok-danger').trigger('click')
    expect(actions.deleteTask).toHaveBeenCalled()
  })

  it('should not dispacthes "deleteTask" when click button cancel', () => {
    const wrapper = shallowMount(TaskDone, {
      store, localVue,
      stubs: {
        'modal': Modal
      },
      propsData: {
        task: state.tasks[0]
      }
    })
    wrapper.find('button').trigger('click')
    wrapper.find('button.dg-btn--cancel').trigger('click')
    expect(actions.deleteTask).not.toHaveBeenCalled()
  })
})
