import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faSearch, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import SummaryApi from '../common';
import ROLE from '../common/role';
import Context from '../context';

function Navbar() {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);

  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const location = useLocation();

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      alert(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      alert(data.message);
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  }

  useEffect(() => {
    if (user?.role === ROLE.ADMIN && location.pathname === "/") {
      navigate("/AdminPanel/AllProducts");
    }
  }, [user, navigate, location.pathname]);

  const brandCategories = [
    {
      name: "MensWear",
      path: "/Categories/MensWear",
      brands: [
        { name: "WESTSIDE", path: "/Categories/MensWear/Brands/WESTSIDE" },
        { name: "Adidas", path: "/Categories/MensWear/Brands/Adidas" },
        { name: "Puma", path: "/Categories/MensWear/Brands/Puma" },
      ],
    },
    {
      name: "WomensWear",
      path: "/Categories/WomensWear",
      brands: [
        { name: "Biba", path: "/Categories/WomensWear/Brands/Biba" },
        { name: "W", path: "/Categories/WomensWear/Brands/W" },
        { name: "Vero Moda", path: "/Categories/WomensWear/Brands/VeroModa" },
      ],
    },
    {
      name: "KidsWear",
      path: "/Categories/KidsWear",
      brands: [
        { name: "BollyLounge", path: "/Categories/KidsWear/Brands/BollyLounge" },
        { name: "Gini & Jony", path: "/Categories/KidsWear/Brands/GiniJony" },
        { name: "UCB Kids", path: "/Categories/KidsWear/Brands/UCBKids" },
      ],
    },
    {
      name: "Gadgets",
      path: "/Categories/Gadgets",
      brands: [
        { name: "Apple", path: "/Categories/Gadgets/Brands/Apple" },
        { name: "Samsung", path: "/Categories/Gadgets/Brands/Samsung" },
        { name: "Oneplus", path: "/Categories/Gadgets/Brands/Oneplus" },
      ],
    },
    {
      name: "Beauty",
      path: "/Categories/Beauty",
      brands: [
        { name: "Lakme", path: "/Categories/Beauty/Brands/Lakme" },
        { name: "Maybelline", path: "/Categories/Beauty/Brands/Maybelline" },
        { name: "L'Oreal", path: "/Categories/Beauty/Brands/LOreal" },
      ],
    },
    {
      name: "Handbag",
      path: "/Categories/Handbag",
      brands: [
        { name: "Caprese", path: "/Categories/Handbag/Brands/Caprese" },
        { name: "Lavie", path: "/Categories/Handbag/Brands/Lavie" },
        { name: "Baggit", path: "/Categories/Handbag/Brands/Baggit" },
      ],
    },
    {
      name: "Watches",
      path: "/Categories/Watches",
      brands: [
        { name: "FrenchConnection", path: "/Categories/Watches/Brands/FrenchConnection" },
        { name: "Titan", path: "/Categories/Watches/Brands/Titan" },
        { name: "Casio", path: "/Categories/Watches/Brands/Casio" },
      ],
    },

  ];

  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [hoveredBrandCategory, setHoveredBrandCategory] = useState(null);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-black sticky top-0 z-50">
        <div className="container d-flex justify-content-end">
          <ul className="nav">
            <li className="nav-item"><Link className="nav-link text-white px-3" to="/TataCliqLuxury">Tata CLiQ Luxury</Link></li>
            <li className="nav-item"><Link className="nav-link text-white px-3" to="/CliqCash">CLiQ Cash</Link></li>
            <li className="nav-item"><Link className="nav-link text-white px-3" to="/GiftCard">Gift Card</Link></li>
            <li className="nav-item"><Link className="nav-link text-white px-3" to="/Cliqcare">CLiQ Care</Link></li>
            <li className="nav-item"><Link className="nav-link text-white px-3" to="/Trackorders">Track Orders</Link></li>
            <div className="flex items-center ms-3">
              {user?._id ? (
                <button onClick={handleLogout} className="bg-[#d00000] hover:bg-[#a30000] text-white px-4 py-1 rounded-full text-sm transition">Logout</button>
              ) : (
                <Link to="/SignIn" className="bg-[#d00000] hover:bg-[#a30000] text-white px-4 py-1 rounded-full text-sm transition">Login</Link>
              )}
            </div>
          </ul>
        </div>
      </nav>

      {/* Main Navbar */}
      <nav className="bg-black sticky top-[36px] z-40">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/">
            <img
              src="https://distributedrewards-production.s3.amazonaws.com/uploads/gift_card_logo/3279/8e3791e6-7570-42f1-a21f-6b5984ebf3c8.png"
              alt="Tata CLiQ Fashion Logo"
              width="95"
            />
          </Link>

          {/* Dropdowns and Search */}
          <div className="d-flex align-items-center flex-grow-1 justify-content-center gap-5">
            {/* Categories Dropdown */}
            <div className="dropdown">
              <button className="btn text-white fw-bold dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Categories
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/Categories/MensWear">MensWear</Link></li>
                <li><Link className="dropdown-item" to="/Categories/WomensWear">WomensWear</Link></li>
                <li><Link className="dropdown-item" to="/Categories/Kidswear">Kidswear</Link></li>
                <li><Link className="dropdown-item" to="/Categories/Gadgets">Gadgets</Link></li>
                <li><Link className="dropdown-item" to="/Categories/Handbag">Handbag</Link></li>
                <li><Link className="dropdown-item" to="/Categories/Watches">Watches</Link></li>
              </ul>
            </div>

            {/* Brands Dropdown */}
            <div
              className="dropdown"
              onMouseEnter={() => setBrandDropdownOpen(true)}
              onMouseLeave={() => {
                setBrandDropdownOpen(false);
                setHoveredBrandCategory(null);
              }}
              style={{ position: "relative" }}
            >
              <button className="btn text-white fw-bold dropdown-toggle" type="button">
                Brands
              </button>
              {brandDropdownOpen && (
                <div className="dropdown-menu show p-0 border-0" style={{
                  minWidth: 400,
                  display: "flex",
                  top: "100%",
                  left: 0,
                  position: "absolute",
                  zIndex: 1000,
                }}>
                  <ul className="list-group rounded-0" style={{ minWidth: 150 }}>
                    {brandCategories.map((cat, idx) => (
                      <li
                        key={cat.name}
                        className={`list-group-item list-group-item-action border-0 ${hoveredBrandCategory === idx ? "bg-light fw-bold" : ""}`}
                        onMouseEnter={() => setHoveredBrandCategory(idx)}
                        style={{ cursor: "pointer" }}
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white border-start" style={{
                    minWidth: 200,
                    display: hoveredBrandCategory !== null ? "block" : "none",
                    padding: "16px 24px",
                  }}>
                    <div className="fw-bold mb-2">Popular Brands</div>
                    <ul className="list-unstyled m-0">
                      {hoveredBrandCategory !== null &&
                        brandCategories[hoveredBrandCategory].brands.map((brand) => (
                          <li key={brand.name} className="mb-1">
                            <Link className="dropdown-item px-0" to={brand.path}>
                              {brand.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="input-group w-50">
              <input
                type="text"
                className="form-control bg-secondary border-1 text-white"
                placeholder="Search Product here"
                aria-label="Search"
                onChange={handleSearch}
                value={search}
              />
              <span className="input-group-text bg-secondary border-0 text-white">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>

          {/* Icons */}
          <div className="d-flex gap-12">
            <div className='relative flex justify-center'>
              {user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                  <span className="mr-2 text-base font-semibold text-white-700">Hi {user?.name}!!</span>
                  {user?.profilePic ? (
                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                  ) : (
                    <FontAwesomeIcon icon={faCircleUser} />
                  )}
                </div>
              )}

              {menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link to={"/AdminPanel/AllProducts"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(false)}>Admin Panel</Link>
                    )}
                  </nav>
                </div>
              )}
            </div>

            {user?._id && (
              <Link className="text-white fs-5 position-relative" to="/Wishlist" aria-label="Wishlist">
                <FontAwesomeIcon icon={faHeart} />
                {context?.wishlistProductCount > 0 && (
                  <div className='bg-danger text-white w-5 h-5 rounded-circle p-1 d-flex align-items-center justify-content-center position-absolute top-0 start-100 translate-middle'>
                    <p className='fs-6'>{context?.wishlistProductCount}</p>
                  </div>
                )}
              </Link>
            )}

            {user?._id && (
              <Link className="text-white fs-5 position-relative" to="/Cart" aria-label="Cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                {context?.cartProductCount > 0 && (
                  <div className='bg-danger text-white w-5 h-5 rounded-circle p-1 d-flex align-items-center justify-content-center position-absolute top-0 start-100 translate-middle'>
                    <p className='fs-6'>{context?.cartProductCount}</p>
                  </div>
                )}
              </Link>
            )}
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
