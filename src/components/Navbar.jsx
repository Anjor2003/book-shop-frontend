import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";

import avatarImg from "../assets/hombre.jpg";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* lado izquierdo */}
        <div className="flex items-center md:gap-6 gap-4">
          <Link to={"/"}>
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>
          {/* search */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="absolute inline-block left-3 inset-y-2 size-4" />
            <input
              type="text"
              placeholder="Aqui buscas"
              className="bg-[#eaeaea] min-w-72 sm:w-[400px] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* lado derecho */}
        <div className=" relative flex items-center space-x-2 md:space-x-3">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* show dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {links.map((link) => (
                        <li
                          key={link.name}
                          onClick={() => setIsDropdownOpen(false)}>
                          <Link
                            to={link.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to={"/login"}>
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <HiOutlineHeart className="size-6" />
          </button>
          <Link
            to={"/cart"}
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-md">
            <HiOutlineShoppingCart className="size-6" />
            {cartItems.length > 0 && (
              <span className="text-[14px] font-semibold ml-1 sm:ml-2">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
