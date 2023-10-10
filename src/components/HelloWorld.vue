<template>
  <div class="hello">
    <h1>header-footer demo</h1>
    <p>
      This is a demo page showing the header and footer of the
      European Data Portal using Vue.
    </p>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
