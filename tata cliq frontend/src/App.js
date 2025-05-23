import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './routes/Home'
import Categories from './pages/Categories'
import Brands from './pages/Brands'
import Cliqcare from './pages/Cliqcare'
import CliqCash from './pages/CliqCash'
import GiftCard from './pages/GiftCard'
import SignIn from './pages/SignIn'
import TataCliqLuxury from './pages/TataCliqLuxury'
import TrackOrder from './pages/Trackorders'
import ForgotPassword from './pages/ForgotPassword'
import SignUp from './pages/SignUp'
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import AdminPanel from './pages/AdminPanel';
import AllUsers from './pages/AllUsers';
import AllProducts from './pages/AllProducts';
import Navbar from './component/Navbar';
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import SearchProduct from './pages/SearchProduct'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import OrderPage from './pages/OrderPage'
import AllOrder from './pages/AllOrder'
import MensWearPage from './pages/Categorypages/MensWearPage';
import MensWearPageWESTSIDE from './pages/Categorypages/MensWearPageWESTSIDE';
import WomensWear from './pages/Categorypages/WomensWear';
import WomensWearBiba from './pages/Categorypages/WomensWearBiba';
import Kidswear from './pages/Categorypages/Kidswear';
import KidswearBollyLounge from './pages/Categorypages/KidswearBollyLounge';
import Gadgets from './pages/Categorypages/Gadgets';
import GadgetsOneplus from './pages/Categorypages/GadgetsOneplus';
import Handbag from './pages/Categorypages/Handbag';
import Watches from './pages/Categorypages/Watches';
import WatchesFrenchConnection from './pages/Categorypages/WatchesFrenchConnection';
import ResetPassword from './pages/ResetPassword';





function AppContent() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [wishlistProductCount, setWishlistProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  const fetchUserAddToWishlist = async () => {
    const dataResponse = await fetch(SummaryApi.addToWishlistProductCount.url, {
      method: SummaryApi.addToWishlistProductCount.method,
      credentials: 'include'
    });

    const dataApi = await dataResponse.json();

    setWishlistProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
    fetchUserAddToWishlist();
    // eslint-disable-next-line
  }, []);

  const location = useLocation();
  // Hide Navbar on /AdminPanel and its subroutes
  const hideNavbar = location.pathname.startsWith("/AdminPanel");

  return (
    <Context.Provider value={{
      fetchUserDetails,
      cartProductCount,
      fetchUserAddToCart,
      wishlistProductCount,
      fetchUserAddToWishlist

    }}>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Categories' element={<Categories />} />
        <Route path='/Brands' element={<Brands />} />
        <Route path='/Cliqcare' element={<Cliqcare />} />
        <Route path='/CliqCash' element={<CliqCash />} />
        <Route path='/GiftCard' element={<GiftCard />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/TataCliqLuxury' element={<TataCliqLuxury />} />
        <Route path="/Trackorders" element={<TrackOrder />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/success" element={<Success />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/Categories/MensWear" element={<MensWearPage />} />
        <Route path="/Categories/MensWear/Brands/WESTSIDE" element={<MensWearPageWESTSIDE />} />
        <Route path="/Categories/WomensWear" element={<WomensWear />} />
        <Route path="/Categories/WomensWear/Brands/Biba" element={<WomensWearBiba />} />

        <Route path="Categories/Kidswear" element={<Kidswear />} />
        <Route path="Categories/KidsWear/Brands/BollyLounge" element={<KidswearBollyLounge />} />
        <Route path="Categories/Gadgets" element={<Gadgets />} />
         <Route path="/Categories/Gadgets/Brands/Oneplus" element={<GadgetsOneplus />} />

         
         
         <Route path="/Categories/Handbag" element={<Handbag />} />
         <Route path="/Categories/Watches" element={<Watches />} />
         <Route path="/Categories/Watches/Brands/FrenchConnection" element={<WatchesFrenchConnection />} />

        <Route path="/AdminPanel" element={<AdminPanel />}>
          {/*<Route index element={<div className="p-4">Select an option from the menu</div>} />*/}
          <Route path="AllUsers" element={<AllUsers />} />
          <Route path="AllProducts" element={<AllProducts />} />
          <Route path="all-orders" element={<AllOrder />} />
        </Route>
      </Routes>
    </Context.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

/*import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './routes/Home'
import Categories from './pages/Categories'
import Brands from './pages/Brands'
import Cliqcare from './pages/Cliqcare'
import CliqCash from './pages/CliqCash'
import GiftCard from './pages/GiftCard'
import SignIn from './pages/SignIn'
import TataCliqLuxury from './pages/TataCliqLuxury'
import Trackorders from './pages/Trackorders'
import ForgotPassword from './pages/ForgotPassword'
import SignUp from './pages/SignUp'
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import AdminPanel from './pages/AdminPanel';
import AllUsers from './pages/AllUsers';
import AllProducts from './pages/AllProducts';
import Navbar from './component/Navbar';
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import SearchProduct from './pages/SearchProduct'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import OrderPage from './pages/OrderPage'
import AllOrder from './pages/AllOrder'
import MensWearPage from './pages/Categorypages/MensWearPage';






function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    /**user Details 
    fetchUserDetails()
    /**user Details cart product 
    fetchUserAddToCart()


  },[])



  
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
      }}>
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path='/Categories' element ={<Categories/>} />
      <Route path='/Brands' element ={<Brands/>} />
      <Route path='/Cliqcare' element ={<Cliqcare/>} />
      <Route path='/CliqCash' element ={<CliqCash/>} />
      <Route path='/GiftCard' element ={<GiftCard/>} />
      <Route path='/SignIn' element ={<SignIn/>} />
      <Route path='/TataCliqLuxury' element ={<TataCliqLuxury/>} />
      <Route path='/Trackorders' element ={<Trackorders/>} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<SearchProduct />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/success" element={<Success />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/Categories/MensWear" element={<MensWearPage />} />
      

      <Route path="/AdminPanel" element={<AdminPanel />}>
      
  {/*<Route index element={<div className="p-4">Select an option from the menu</div>} />*
  <Route path="AllUsers" element={<AllUsers />} />
  <Route path="AllProducts" element={<AllProducts />} />
  <Route path="all-orders" element={<AllOrder />} />
  
  

  
</Route>

      

    </Routes>
    
    </BrowserRouter>
    </Context.Provider>
    </>
  );
}

export default App;*/
