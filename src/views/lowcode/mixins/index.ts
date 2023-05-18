/*
 * @Author: cola
 * @Date: 2023-04-06 23:51:57
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'CustomApi',
  data() {
    return {
      apiData: [],
    }
  },
  beforeCreate() {
    if (this.beforeCreate) this.beforeCreate.bind(this)
  },
  async created() {
    if (this.api) {
      const res = await this?.api()
      console.log(res)
      if (res?.data) {
        this.apiData = res.data
      }
    }
    if (this.created) this.created.bind(this)
  },
  beforeMount() {
    if (this.beforeMount) this.beforeMount.bind(this)
  },
  mounted() {
    if (this.mounted) this.mounted.bind(this)
  },
  beforeDestroy() {
    if (this.beforeDestroy) this.beforeDestroy.bind(this)
  },
  destroyed() {
    if (this.destroyed) this.destroyed.bind(this)
  },
}
