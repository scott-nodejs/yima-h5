export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: Number,
      default: 240
    }
  },
  render (h) {
    return (

        <img src={this.item.url} style={{
          height: `${this.height}px`, width: 240
        }}></img>

    )
  }
}
