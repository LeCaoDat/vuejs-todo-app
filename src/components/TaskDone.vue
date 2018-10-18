<template>
  <li class="row">
    <div class="col-md-10">
      {{ task.content }}
    </div>
    <div class="col-md-2">
      <button class="btn btn-default" @click="showModal"><i class="fa fa-times"></i></button>
    </div>
    <modal v-if="show" @confirm="confirm" @cancel="cancel" :type="'danger'"
      :message="'Do you want to delete this task?'" :cancelText="'Cancel'" :okText="'Delete'"></modal>
  </li>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from '@/components/modal/Modal'
export default {
  name: 'TaskDone',
  components: {Modal},
  props: {
    task: Object
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    ...mapActions([
      'deleteTask'
    ]),
    showModal () {
      this.show = true
    },
    confirm () {
      this.deleteTask(this.task)
    },
    cancel () {
      this.show = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
