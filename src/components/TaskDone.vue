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
import { mapActions } from 'vuex'
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
    ...mapActions([
      'deleteTask'
    ]),
    showModal () {
      this.$dialog.confirm('Do you want to delete this task?', {okText: 'Delete', cancelText: 'Cancel'})
        .then(
          confirm => {
            this.deleteTask(this.task)
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
