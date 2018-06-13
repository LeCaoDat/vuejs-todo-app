<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="todolist not-done">
          <h1>Todos</h1>
          <input type="text" class="form-control add-task" placeholder="Add task">
          <hr>
          <ul id="sortable" class="list-unstyled">
            <task-not-done v-for="(task, index) in tasksNotDone" v-bind:key="index" v-bind:task="task">
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
            <task-done v-for="(task, index) in tasksDone" v-bind:key="index" v-bind:task="task">
            </task-done>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoService from '@/services/todo'
import TaskNotDone from '@/components/TaskNotDone'
import TaskDone from '@/components/TaskDone'
export default {
  name: 'ListTodo',
  components: {TaskNotDone, TaskDone},
  data () {
    return {
      tasks: []
    }
  },
  created () {
    TodoService.getTodoList().then((tasks) => {
      this.tasks = tasks
    })
  },
  computed: {
    tasksNotDone () { return this.tasks.filter(task => !task.is_done) },
    tasksDone () { return this.tasks.filter(task => task.is_done) }
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
.form-control{
  border-radius: 0;
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
