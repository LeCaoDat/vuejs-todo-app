<template>
  <li class="row ui-state-default">
    <div class="col-md-9">
      <div v-if="edit" class="pb-1">
        <input class="form-control" type="text" name="content" v-model="content"
          v-validate="{required: true, regex: /^[a-zA-Z\s]+$/}"
          :class="{'is-invalid': errors.first('content')}">
        <div v-show="errors.first('content')" class="invalid-feedback">
          {{ errors.first('content') }}
        </div>
      </div>
      <template v-else>
        {{ task.content }}
      </template>
    </div>
    <div v-if="edit" class="col-md-3 text-center">
      <button class="btn btn-default" @click="saveTask" :disabled="errors.first('content')">
        <i class="fa fa-save"></i>
      </button>
      <button class="btn btn-default" @click="cancel">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div v-else>
      <button class="btn btn-default" @click="showEdit">
        <i class="fa fa-edit"></i>
      </button>
      <button class="btn btn-default" @click="setDoneTask(task)">
        <i class="fa fa-check"></i>
      </button>
    </div>
  </li>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'TaskNotDone',
  props: {
    task: Object
  },
  created () {
    this.content = this.task.content
  },
  data () {
    return {
      content: '',
      edit: false
    }
  },
  methods: {
    ...mapActions([
      'setDoneTask',
      'updateTask'
    ]),
    showEdit () {
      this.edit = true
    },
    saveTask (event) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateTask({task: this.task, content: this.content, hideEdit: this.hideEdit})
        }
      })
    },
    cancel () {
      this.content = this.task.content
      this.hideEdit()
    },
    hideEdit () {
      this.edit = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
