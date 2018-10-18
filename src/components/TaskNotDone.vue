<template>
  <li class="row ui-state-default">
    <div class="col-md-9">
      <div v-show="edit" class="pb-1">
        <input class="form-control" type="text" name="content" v-model="content"
          v-validate="{required: true, regex: /^[a-zA-Z\s]+$/}"
          :class="{'is-invalid': errors.first('content')}">
        <div v-show="errors.first('content')" class="invalid-feedback">
          {{ errors.first('content') }}
        </div>
      </div>
      <span class="form-control borderless" v-show="!edit">
        {{ task.content }}
      </span>
    </div>
    <div v-if="edit" class="col-md-3 text-center">
      <button class="btn btn-default save-task" @click="saveTask" :disabled="errors.first('content')">
        <i class="fa fa-save"></i>
      </button>
      <button class="btn btn-default cancel" @click="cancel">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div class="col-md-3 text-center" v-else>
      <button class="btn btn-default show-edit" @click="showEdit">
        <i class="fa fa-edit"></i>
      </button>
      <button class="btn btn-default set-done" @click="setDoneTask(task)">
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
.borderless {
  border: none;
}
</style>
