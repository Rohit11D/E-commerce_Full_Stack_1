import React from "react";
import "../Navbar/Navbar.css";
import logo from "../Assests/logo.png";
import cart_icon from "../Assests/cart_icon.png";
import { useState,useContext,useRef } from "react";
import { ShopContext } from "../Context/ShopContext";
import {Link} from "react-router-dom";
import nav_dropdown from '../Assests/dropdown_icon.png';
const Navbar = () =>{
    const [menu,setMenu] = useState("shop");
    const [hoverItem, setHoverItem] = useState(null); // New state to track hover
    const{getTatalCartItems} = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle=(e)=>{
     menuRef.current.classList.toggle('nav-menu-visible');
     e.target.classList.toggle('open');
  }
    return (
        <div className='navbar'>
          <div className="nav-logo">
            <img src={logo} alt="" srcset="" />
            <p>ShopNow</p>
            </div> 
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                {/* <li onClick={()=>{setMenu("shop")}}><Link className="lin" to="/">Shop</Link>{menu==="shop"?<hr />:<></>}</li> */}
                {/* <li onClick={()=>{setMenu("men")}}><Link className="lin" to="/men">Men</Link>{menu==="men"?<hr />:<></>}</li>
                <li onClick={()=>{setMenu("women")}}><Link className="lin" to="/women">Women</Link>{menu==="women"?<hr />:<></>}</li> */}
                {/* <li onClick={()=>{setMenu("kids")}}><Link className="lin" to="/kids">Kids</Link>{menu==="kids"?<hr />:<></>}</li> */}
                <li  onMouseEnter={() => setHoverItem("shop")}  onMouseLeave={() => setHoverItem(null)} onClick={()=>{setMenu("shop"); setHoverItem(null)} } ><Link className="lin" to="/">Shop</Link>{hoverItem==="shop"&&menu!=="shop"?<hr className="hr-hover"/>:<></>}{menu==="shop"?<hr />:<></>}</li>
                <li  onMouseEnter={() => setHoverItem("men")}  onMouseLeave={() => setHoverItem(null)} onClick={()=>{setMenu("men"); setHoverItem(null)} } ><Link className="lin" to="/men">Men</Link>{hoverItem==="men"&&menu!=="men"?<hr className="hr-hover"/>:<></>}{menu==="men"?<hr />:<></>}</li>
                <li  onMouseEnter={() => setHoverItem("women")}  onMouseLeave={() => setHoverItem(null)} onClick={()=>{setMenu("women"); setHoverItem(null)} } ><Link className="lin" to="/women">Women</Link>{hoverItem==="women"&&menu!=="women"?<hr className="hr-hover"/>:<></>}{menu==="women"?<hr />:<></>}</li>
                <li  onMouseEnter={() => setHoverItem("kids")}  onMouseLeave={() => setHoverItem(null)} onClick={()=>{setMenu("kids"); setHoverItem(null)} } ><Link className="lin" to="/kids">Kids</Link>{hoverItem==="kids"&&menu!=="kids"?<hr className="hr-hover"/>:<></>}{menu==="kids"?<hr />:<></>}</li>
                  </ul> 
                <div className="nav-login-cart">
                  {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token')
                  ;window.location.replace('/')}}>Logout</button>
                  :<Link to="/login"><button>Login</button></Link>}
                    
                    <Link to="/cart"><img src={cart_icon} alt="" srcset="" /></Link>
                    <div className="nav-cart-count">{getTatalCartItems()}</div>
                </div>
        </div>
    )
}
export default Navbar;