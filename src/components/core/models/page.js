import Element from '@/components/core/models/element'
//import LbpBackground from '@/components/core/plugins/lbp-background'

class Page {
  constructor (page = {}) {
    this.uuid = page.uuid || +new Date()
    this.title = page.title || ''
    this.elements = page.elements
  }

  clone () {
    const elements = this.elements.map(element => new Element(element))
    return new Page({ title: this.title, elements })
  }
}

export default Page
