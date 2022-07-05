import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import AboutScreen from './screens/AboutScreen'
import ContactScreen from './screens/ContactScreen'
import DesignScreen from './screens/DesignScreen'
import ProductScreen from './screens/ProductScreen'
import AccountScreen from './screens/AccountScreen'
import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen'
import SelAddressScreen from './screens/SelAddressScreen'
import OrderScreen from './screens/OrderScreen'
import OrderDetailScreen from './screens/OrderDetailScreen'
import OrderTouristScreen from './screens/OrderTouristScreen'
import ShapesScreen from './screens/ShapesScreen'
import FreshenerScreen from './screens/FreshenerScreen'
import DesignerScreen from './screens/DesignerScreen'
import { useDispatch, useSelector } from 'react-redux'
function App() {
  const headFootInfo = useSelector(state => state.headFootInfo)
  return (
    <Router>
      {headFootInfo.show &&  <Header />}
      <main >
        {/* <Container> */}
          <Route path='/' component={HomeScreen} exact />
          <Route path='/about' component={AboutScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/contact' component={ContactScreen} />
          <Route path='/design' component={DesignScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/account' component={AccountScreen} />
          <Route path='/cart' component={CartScreen} />
          <Route path='/placeorder/:id' component={ShippingScreen} />
          <Route path='/payment/:id' component={ShippingScreen} />
          <Route path='/selAddress' component={SelAddressScreen} />
          {/* <Route path='/order/:id' component={OrderScreen} /> */}
          <Route path='/order/:id' component={OrderDetailScreen} />
          <Route path='/order' exact component={OrderTouristScreen} />
          <Route path='/zitiquhuo/tourist' component={OrderTouristScreen} />
          <Route path='/shapes' component={ShapesScreen} />
          <Route path='/freshener/:id' component={FreshenerScreen} />
          <Route path='/designer' component={DesignerScreen} />
          {/* <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />

          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

          <Route path='/admin/orderlist' component={OrderListScreen} /> */}
        {/* </Container> */}
      </main>
      {headFootInfo.show &&  <Footer />}
    </Router>
  );
}

export default App;
