import Login from './system/Login'
import Register from './system/Register'
import NotFound from './system/404'
import HotelIndex from './components/HotelIndex'
import Info from './page/Info'
import OrderDetails from './page/OrderDetails'
import Setting from './page/Setting'
import Help from './page/Help'
import Try from  './page/try'


const routes = [
    {
        path: '/login',
        component: Login,
    }, {
        path: '/register',
        component: Register,
    }, {
        path: '/404',
        component: NotFound,
    },
    {
        path: '/info',
        component: Info,
        children: [
            {path: 'orderDetails', component: OrderDetails, name: '订单详情'},
            {path: 'setting', component: Setting, name: '账户设置'},
            {path: 'help', component: Help, name: '帮助'},
        ]
    },

    {
        path: '/hotelIndex',
        component: HotelIndex,
    },
    {
        path: '/try',
        component: Try,
    },
]



export default routes;