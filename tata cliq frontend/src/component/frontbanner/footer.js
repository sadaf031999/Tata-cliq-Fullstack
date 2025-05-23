const TataCliqFooter = () => {
    return (
      <>
        {/* Footer Section */}
        <footer className="bg-gray-100 px-6 py-12 text-sm text-gray-800 border-t mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Tata MarketPlace */}
            <div>
              <h3 className="font-semibold mb-3">Tata MarketPlace</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Terms of Use</li>
                <li>Privacy Policy</li>
                <li>Affiliates</li>
                <li>Sitemap</li>
              </ul>
            </div>
  
            {/* Customer Service */}
            <div>
              <h3 className="font-semibold mb-3">Customer Service</h3>
              <ul className="space-y-2">
                <li>Shopping</li>
                <li>Offers & Promotions</li>
                <li>Payments</li>
                <li>Cancellation</li>
                <li>Returns & Refunds</li>
                <li>CliQ And PiQ</li>
                <li>Returns Policy</li>
                <li>Electronics Return Policy</li>
                <li>Contact Us</li>
                <li>Reviews Guidelines</li>
                <li>Furniture Return Policy</li>
                <li>Replacement Policy</li>
              </ul>
            </div>
  
            {/* My Tata CLiQ */}
            <div>
              <h3 className="font-semibold mb-3">My Tata CLiQ</h3>
              <ul className="space-y-2">
                <li>My Account</li>
                <li>My Orders</li>
                <li>My Shopping Bag</li>
                <li>My Wishlist</li>
              </ul>
            </div>
  
            {/* Offerings */}
            <div>
              <h3 className="font-semibold mb-3">Tata CLiQ Offerings</h3>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-gray-700">
                {[
                  'Watches for Men', 'Campus Shoes', 'Sandals for Men', 'Sneakers for Men',
                  'Reebok Shoes', 'Cotton Kurtis', 'Woodland Shoes', 'Jumpsuits', 'Allen Solly',
                  'Sparx Shoes', 'Gold Rings', 'Formal Shoes for Men', 'Sports Shoes for Men',
                  'Wallets for Men', 'Ladies Watches', 'Trolley Bags', 'Handbags for Women',
                  'Sling Bags for Women', 'Casual Shoes for Men', 'Boots for Men', 'Digital Watches',
                  'Sonata Watches', 'Sneakers for Women', 'Running Shoes', 'Puma Shoes',
                  'Boots for Women', 'Skechers', 'Malabargold', 'Fabindia', 'Utsa', 'Vark', 'Gia',
                  'LOV', 'Sitemap'
                ].map((item, index) => (
                  <span key={index} className="after:content-['|'] last:after:content-[''] pr-2">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </footer>
  
        {/* Description Section */}
        {/* Description Section - fully grey including content */}
<section className="bg-gray-200 px-6 py-10 text-gray-800 text-sm leading-relaxed">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-base font-semibold mb-2">Tata CLiQ FASHION: Shop Online with India’s most trusted destination</h2>
    <p className="mb-4">
      Genuine products from all the top brands get delivered right to your doorstep. Our sleek, immersive design allows you to easily navigate between categories and brand stores so that you can find a wide selection of <a href="#" className="underline">womenswear</a>, <a href="#" className="underline">menswear</a>, <a href="#" className="underline">kidswear</a>, <a href="#" className="underline">footwear</a>, <a href="#" className="underline">watches</a>, <a href="#" className="underline">accessories</a> online. You can also check our great offers and get the best prices on various products across lifestyle, fashion, and more.
    </p>

    <h2 className="text-base font-semibold mb-2">Online Shopping: Fast & convenient with the click of a button</h2>
    <p className="mb-4">
      The upside of online shopping at Tata CLiQ FASHION online store is that you'll save on time and most importantly money. It's as simple as comparing products and prices online before making the right buy. What's more, you also have the option to pay for your favourite brands and products using our easy EMI options. Of course, you can buy and try – in the convenience of your home. Returns are easy too: We'll pick up your returns for free or you can also drop off the goods at the nearest brand store.
    </p>

    <h2 className="text-base font-semibold mb-2">Tata CLiQ FASHION Shopping App: just a few clicks on Android & iOS</h2>
    <p className="mb-4">
      Download the Android app from the <a href="#" className="underline">Play Store</a> or the iOS app from <a href="#" className="underline">Apple App Store</a> and get set to enjoy a range of benefits. Apart from the best deals, amazing offers and the latest styles online, the app also gives you the flexibility to shop at your convenience. Use the easy share options to share your shopping with your friends and family to ensure you're buying something perfect. With constant updates and a host of new features being introduced constantly, enjoy a shopping experience that you'll love.
    </p>

    <h2 className="text-base font-semibold mb-2">Tata CLiQ FASHION: The most genuine place for Fashion and Lifestyle</h2>
    <p>
      With an exclusive Brand Store for <a href="#" className="underline">Westside Online</a> we have most of your trendy shopping needs taken care of. Make Tata CLiQ FASHION your online shopping destination and get the best deals on your favourite brands, with 100% genuine products. Be it jewellery or makeup, you can count on Tata CLiQ FASHION for receiving only the most authentic products.
    </p>
  </div>
</section>

      </>
    );
  };
  
  export default TataCliqFooter;
  