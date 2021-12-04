export default {
  render () {
    return <div class="logo"><img style="display: inline-block;width:25px;height:25px;vertical-align: bottom;margin-right: 15px;" src="http://img.hazer.top/logo.png"></img><router-link to={{ path: '/' }}>
      {/* YIMA H5 Luban H5 */}
      {this.$t('app.title')}
    </router-link></div>
  }
}
