<template>
  <li class="row ui-state-default">
    <div class="col-md-9">
      {{ task.content }}
    </div>
    <div class="col-md-3">
      <button class="btn btn-default">
        <i class="fa fa-edit"></i>
      </button>
      <button class="btn btn-default" @click="setDone">
        <i class="fa fa-check"></i>
      </button>
    </div>
  </li>
</template>

<script>
import TodoService from '@/services/todo'
export default {
  name: 'TaskNotDone',
  props: {
    task: Object
  },
  data () {
    return {
    }
  },
  methods: {
    setDone () {
      TodoService.setDone(this.task)
        .then(
          task => {
            this.task.is_done = task.is_done
          },
          error => {
            this.$emit('handle-error', error.message)
          }
        )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
