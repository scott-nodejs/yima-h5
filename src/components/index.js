/**
 * 注册自定义组件
 */

import BottomMenu from './general/bottom-menu'
import FloorMenu from './general/floor-menu'
import BaseForm from './general/form'
import GridMenu from './general/grid-menu'
import BaseImage from './general/image'
import BaseText from './general/text'
import RichText from './general/richText'
import Timeout from './general/timeout'
import BaseVideo from './general/video'

import Header1 from './general/header1'
import Header2 from './general/header2'

import ScrollLeft from './swiper/scroll-left'
import SwiperBanner from './swiper/swiper-banner'

import HorizontalList from './list/horizontal-list'
import VerticalList from './list/vertical-list'

import PageFaq from './pageModule/page-faq'
import PageIntro from './pageModule/page-intro'
import PageParagraph from './pageModule/page-paragraph'
import PageTitle from './pageModule/page-title'

import NewsMarquee from './animate/news-marquee'

import Coupon from './general/coupon'

import TScroll from './general/trans-scroll'
import MyTebs from './general/Mytebs'
import AdJump from './general/adJump'

import Lottery from './general/lottery'

export default {
  install(Vue) {
    Vue.component(BottomMenu.name, BottomMenu)
    Vue.component(FloorMenu.name, FloorMenu)
    Vue.component(BaseForm.name, BaseForm)
    Vue.component(GridMenu.name, GridMenu)
    Vue.component(BaseImage.name, BaseImage)
    Vue.component(BaseText.name, BaseText)
    Vue.component(Timeout.name, Timeout)
    Vue.component(NewsMarquee.name, NewsMarquee)
    Vue.component(ScrollLeft.name, ScrollLeft)
    Vue.component(SwiperBanner.name, SwiperBanner)
    Vue.component(HorizontalList.name, HorizontalList)
    Vue.component(VerticalList.name, VerticalList)
    Vue.component(PageFaq.name, PageFaq)
    Vue.component(PageIntro.name, PageIntro)
    Vue.component(PageParagraph.name, PageParagraph)
    Vue.component(PageTitle.name, PageTitle)
    Vue.component(BaseVideo.name, BaseVideo)
    Vue.component(Header1.name, Header1)
    Vue.component(Header2.name, Header2)
    Vue.component(RichText.name, RichText)
    Vue.component(Coupon.name, Coupon)
    Vue.component(TScroll.name, TScroll)
    Vue.component(MyTebs.name, MyTebs)
    Vue.component(AdJump.name, AdJump)
    Vue.component(Lottery.name, Lottery)
  }
}
