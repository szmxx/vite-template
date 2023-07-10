export default defineComponent({
  name: "runtime",
  data() {
    return {
      loading: true,
    }
  },
  created() {
    const code = `
      this.loading = false
      console.log(this)
    `
    const f = new Function(code)
    f.call(this, this)
  },
  mounted(){

  },
  beforeCreate() {

  },
})
