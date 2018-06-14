<template>
  <b-alert :show="dismissCountDown"
    dismissible
    variant="danger"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged">
    {{error}}
  </b-alert>
</template>

<script>
export default {
  name: 'Alert',
  data () {
    return {
      dismissCountDown: 10
    }
  },
  props: ['error'],
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
