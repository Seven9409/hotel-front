import Login from './system/Login'
import Register from './system/Register'
import NotFound from './system/404'
import Info from './page/Info'
import OrderDetails from './page/OrderDetails'
import Setting from './page/Setting'
import Help from './page/Help'
import  HomePage from './page/HomePage'
import  BookingRoomPage from './page/BookingRoomPage'
import HotelIndex from './components/HotelIndex'

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
        path: '/hotelIndex',
        component: HotelIndex,
        children: [
            {path: 'homePage', component: HomePage, name: 'index'},
            {path: 'info',
                component: Info,
                children: [
                    {path: 'orderDetails', component: OrderDetails, name: 'aa'},
                    {path: 'setting', component: Setting, name: 'sd'},
                    {path: 'help', component: Help, name: 'ff'},
                ]
            },
            {path: 'bookingRoomPage', component: BookingRoomPage, name: 'xcc'},
        ]
    },
]



export default routes;