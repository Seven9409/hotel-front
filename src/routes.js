import Login from './system/Login'
import Register from './system/Register'
import NotFound from './system/404'
import HelloWorld from './components/HelloWorld'
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
        path: '/Info',
        component: Info,
        children: [
            {path: 'OrderDetails', component: OrderDetails, name: '订单详情'},
            {path: 'Setting', component: Setting, name: '账户设置'},
            {path: 'Help', component: Help, name: '帮助'},
        ]
    },

    {
        path: '/HelloWorld',
        component: HelloWorld,
    },
    {
        path: '/Try',
        component: Try,
    },
]



export default routes;