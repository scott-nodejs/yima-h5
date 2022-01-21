import Vue from 'vue'
import { Layout,
         Menu,
         Dropdown,
         Icon,
         Card,
         Tooltip,
         Col,
         Pagination,
         Row,
         Spin,
         Modal,
         Popover,
         Radio
        } from 'ant-design-vue'
// !#zh 请注意，务必使用 font-awesome@4.7.0 版本
import 'font-awesome/css/font-awesome.min.css'

const { Header,Sider,Content } = Layout;
const { Meta } = Card;
const { SubMenu, Item} = Menu;
const { Group } = Radio;

Vue.component(Layout.name, Layout);
Vue.component(Menu.name, Menu);
Vue.component(Dropdown.name, Dropdown);
Vue.component(Icon.name, Icon);
Vue.component(Card.name, Card);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Col.name, Col);

Vue.component(Pagination.name, Pagination);
Vue.component(Row.name, Row);
Vue.component(Spin.name, Spin);
Vue.component(Modal.name, Modal);
Vue.component(Header.name, Header);
Vue.component(Sider.name, Content);
Vue.component(Meta.name, Meta);
Vue.component(Content.name, Content);
Vue.component(SubMenu.name, SubMenu);
Vue.component(Item.name, Item);
Vue.component(Popover.name, Popover);
Vue.component(Sider.name, Sider);

Vue.component(Radio.name, Radio);
Vue.component(Group.name, Group);