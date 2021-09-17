export default {
  render () {
    return <div class="logo"><router-link to={{ path: '/' }}>
      {/* YIMA H5 Luban H5 */}
      {this.$t('app.title')}
    </router-link></div>
  }
}
