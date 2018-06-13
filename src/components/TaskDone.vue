<template>
  <li class="row">
    <div class="col-md-10">
      {{ task.content }}
    </div>
    <div class="col-md-2">
      <button class="btn btn-default"><i class="fa fa-times"></i></button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TaskDone',
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
