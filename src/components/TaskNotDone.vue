<template>
  <li class="row ui-state-default">
    <div class="col-md-9">
      {{ task.content }}
    </div>
    <div class="col-md-3">
      <button class="btn btn-default">
        <i class="fa fa-edit"></i>
      </button>
      <button class="btn btn-default">
        <i class="fa fa-check"></i>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TaskNotDone',
  data () {
    return {
    }
  },
  props: ['task']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
