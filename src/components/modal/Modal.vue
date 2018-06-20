<template>
  <div>
    <div class="dg-backdrop"></div>
    <div class="dg-container">
      <div class="dg-content-cont dg-content-cont--floating">
        <div class="dg-main-content">
          <div class="dg-content-body">
            <div class="dg-content">{{message}}</div>
          </div>
          <div class="dg-content-footer">
            <button class="dg-btn dg-btn--cancel" @click="cancel"><span>{{cancelText}}</span></button>
            <button class="dg-btn dg-pull-right" @click="confirm" :class="[(type === 'danger') ? 'dg-btn--ok-danger' : 'dg-btn--ok']">
              <span class="dg-btn-content">
                <span>{{okText}}</span>
              </span>
            </button>
            <div class="dg-clear"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {
    }
  },
  props: ['message', 'type', 'okText', 'cancelText'],
  methods: {
    confirm () {
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./modal.css" scoped>
</style>
