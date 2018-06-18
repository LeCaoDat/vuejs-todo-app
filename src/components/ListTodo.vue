<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 pt-5">
        <alert v-for="(error, index) in allError" :error="error" :key="index"></alert>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="todolist not-done">
          <h1>Todos</h1>
          <input type="text" class="form-control add-task" placeholder="Add task"
            v-model="newTask.content" @keyup.enter="createTask" v-validate="{required: true, regex: /^[a-zA-Z\s]+$/}"
            name="content" :class="{'is-invalid': errors.first('content')}" >
          <div v-show="errors.first('content')" class="invalid-feedback">
            {{ errors.first('content') }}
          </div>
          <hr>
          <ul id="sortable" class="list-unstyled">
            <task-not-done v-for="task in tasksNotDone" :key="task.id" :task="task" @handle-error="handleError">
            </task-not-done>
          </ul>
          <div class="todo-footer">
            <strong><span class="count-todos">{{ tasksNotDone.length }}</span></strong> Items Left
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="todolist">
          <h1>Already Done</h1>
          <ul id="done-items">
            <task-done v-for="task in tasksDone" :key="task.id" :task="task" @handle-error="handleError">
            </task-done>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskNotDone from '@/components/TaskNotDone'
import TaskDone from '@/components/TaskDone'
import Alert from '@/components/Alert'
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: 'ListTodo',
  components: {TaskNotDone, TaskDone, Alert},
  data () {
    return {
      newTask: {content: ''}
    }
  },
  created () {
    this.getListTodo()
  },
  computed: {
    ...mapState({
      tasks: 'tasks',
      allError: 'errors'
    }),
    ...mapGetters([
      'tasksNotDone',
      'tasksDone',
      'taskNotDoneCount'
    ])
  },
  methods: {
    ...mapActions([
      'getListTodo',
      'addTask',
      'addError'
    ]),
    createTask (event) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addTask(this.newTask)
        } else {
          this.handleError('False form validation')
        }
      })
    },
    handleError (error) {
      this.addError(error)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  background-color:#EEEEEE;
}
.todolist{
  background-color:#FFF;
  padding: 20px 20px 10px 20px;
  margin-top:30px;
}
.todolist h1{
  margin: 0;
  padding-bottom: 20px;
  text-align: center;
}
li.ui-state-default{
  background:#fff;
  border:none;
  border-bottom:1px solid #ddd;
}
li.ui-state-default:last-child{
  border-bottom:none;
}
.todo-footer{
  background-color:#F4FCE8;
  margin:0 -20px -10px -20px;
  padding: 10px 20px;
}
#done-items li{
  padding:10px 0;
  border-bottom:1px solid #ddd;
  text-decoration:line-through;
}
#done-items li:last-child{
  border-bottom:none;
}
#checkAll{
  margin-top:10px;
}
#done-items .list-group-item {
  border: none;
}
.row {
  margin: 0;
}
</style>
