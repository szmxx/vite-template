/*
 * @Author: cola
 * @Date: 2023-07-10 18:00:15
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
    // @ts-ignore
    if (this.api) {
      // @ts-ignore
      const res = await this?.api()
      if (res?.data) {
        // @ts-ignore
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
