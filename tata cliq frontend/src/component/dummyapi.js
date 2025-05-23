import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = [];
      const limit = 100;
      const total = 500;

      for (let skip = 0; skip < total; skip += limit) {
        const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const data = await res.json();
        allProducts.push(...data.products);
      }

      setProducts(allProducts);
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛒 Cart: {cart.length} items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-xl p-4 shadow">
            <Carousel showThumbs={false} showStatus={false} infiniteLoop>
              {product.images.map((img, idx) => (
                <div key={idx}>
                  <img
                    src={img}
                    alt={product.title}
                    className="h-36 w-full object-cover rounded"
                  />
                </div>
              ))}
            </Carousel>
            <h3 className="text-sm font-semibold mt-2 line-clamp-1">{product.title}</h3>
            <p className="text-gray-500 text-sm">${product.price}</p>
            <button
              className="mt-2 w-full px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
