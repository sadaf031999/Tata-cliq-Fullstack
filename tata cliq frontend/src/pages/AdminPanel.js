import React,{ useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Outlet,useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import ROLE from '../common/role';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';



const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      alert(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      alert(data.message)
    }

  }
  return (
    <>
      <div className="flex items-center justify-center relative py-6 px-4">
  <h2 className="text-xl font-bold tracking-wide text-red-700 absolute left-1/2 transform -translate-x-1/2">
    Tata CLiQ Admin Dashboard
  </h2>
  <div className="ml-auto">
    {user?._id ? (
      <button
        onClick={handleLogout}
        className="bg-red-700 hover:bg-red-800 text-white px-4 py-1 rounded-full text-sm transition"
      >
        Logout
      </button>
    ) : (
      <Link
        to="/SignIn"
        className="bg-red-700 hover:bg-red-800 text-white px-4 py-1 rounded-full text-sm transition"
      >
        Login
      </Link>
    )}
  </div>
</div>



      <div className="min-h-[calc(90vh-120px)] md:flex hidden">
        {/* Sidebar */}
        <aside className="bg-white min-h-full w-full max-w-60 customShadow">
          <div className="h-32 flex justify-center items-center flex-col">
            <div className="text-5xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-20 h-20 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FontAwesomeIcon icon={faCircleUser} />
              )}
            </div>
             
            <p className="capitalize text-lg font-semibold">{user?.name}</p>
            <p className="text-sm">{user?.role}</p>
            
          </div>

          {/* Navigation */}
          <nav className="grid p-4">
            <Link to="AllUsers" className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to="AllProducts" className="px-2 py-1 hover:bg-slate-100">
              All Products
            </Link>
            <Link to={"all-orders"} className='px-2 py-1 hover:bg-slate-100'>All Orders</Link>
          </nav>
        </aside>

        {/* Nested route rendering */}
        <main className="w-full h-full p-2">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
