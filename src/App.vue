<template>
  <div id="app">
      <test class="test"></test>
  </div>
</template>

<script>
import Test from './views/Test.vue'

export default {
    name: 'app', 
    data: function () {
        return {
            message: "hello, vue"
        }
    },
    components: {
        Test
    }
}
</script>

<style lang="scss" scoped>
@import 'styles/index.scss';
#app {
    // background: green;
    // .test {
    //     color: red;
    // }
}
</style>



