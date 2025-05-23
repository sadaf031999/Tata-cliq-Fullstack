import React from 'react'
import Navbar from '../component/Navbar';
import Banner from '../component/frontbanner/Banner';
import SignIn from '../pages/SignIn';
import Carousels from '../component/frontbanner/carousels';
import CategoryCards from '../component/frontbanner/categorycards';
import OfferBanners from  '../component/frontbanner/offerBanners';
import TataCliqOffers from  '../component/frontbanner/offercards';
import ProductList from '../component/dummyapi';
import IndianwearBanner from '../component/frontbanner/indianwearbanner';
import IndianwearCards from '../component/frontbanner/indianwearcards';
import BoyBanner from '../component/frontbanner/boybanner';
import BoywearCards from '../component/frontbanner/boyfitcard'; 
import KidsCard from '../component/frontbanner/kidscard'; 
import GadgetsCard from '../component/frontbanner/gadgetscard'; 
import WatchCard from '../component/frontbanner/watchcard';
import SunglassCard from '../component/frontbanner/sunglasscard'; 
import JewelleryCard from '../component/frontbanner/jewellerycard'; 
import TataCliqFooter from '../component/frontbanner/footer';
import HorizontalCardProduct from '../component/HorizontalCardProduct'
import CategoryWiseProductDisplay from '../component/CategoryWiseProductDisplay';



function Home() {
  
  return (
    <>
    
    
    <Banner/>
    <Carousels/>
    <CategoryCards/>
   
       
    <OfferBanners/>
    <TataCliqOffers/>
    {/*<ProductList/>*/}
    <IndianwearBanner/>
    <IndianwearCards/>
    <BoyBanner/>
    <BoywearCards/>
    <KidsCard/>
    <GadgetsCard/>
    <WatchCard/>
    <SunglassCard/>
    <JewelleryCard/>
    
    <TataCliqFooter/>
    
</>
  )
}

export default Home