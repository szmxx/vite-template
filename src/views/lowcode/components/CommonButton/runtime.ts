/*
 * @Author: cola
 * @Date: 2023-07-10 18:01:42
 * @LastEditors: cola
 * @Description:
 */
export default defineComponent({
  name: 'Runtime',
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
  mounted() {},
  beforeCreate() {},
})
