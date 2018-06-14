<template>
  <li class="row">
    <div class="col-md-10">
      {{ task.content }}
    </div>
    <div class="col-md-2">
      <button class="btn btn-default" @click="showModal"><i class="fa fa-times"></i></button>
    </div>
  </li>
</template>

<script>
import TodoService from '@/services/todo'
export default {
  name: 'TaskDone',
  props: {
    task: Object
  },
  data () {
    return {
    }
  },
  methods: {
    showModal () {
      this.$dialog.confirm('Do you want to delete this task?', {okText: 'Delete', cancelText: 'Cancel'})
        .then(
          confirm => {
            TodoService.deleteTask(this.task).then(
              task => {
                this.$emit('delete-task', this.task)
              },
              error => {
                this.$emit('handle-error', error.message)
              }
            )
          },
          reject => {}
        )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
