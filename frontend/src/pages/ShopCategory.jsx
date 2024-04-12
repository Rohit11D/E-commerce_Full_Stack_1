import React, { useContext } from "react";
import "../pages/CSS/ShopCategory.css"
import {ShopContext} from '../components/Context/ShopContext';
import dropdown_icon from '../components/Assests/dropdown_icon.png';
import Item from "../components/Item/Item.jsx";
const ShopCategory = (props) =>{
    // console.log(props.banner);
    const {all_product}=useContext(ShopContext);
    return (
        <div className="shop-category">
            <img className="shop-category-banner" src={props.banner} alt="" srcset="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>showing 1-12</span>out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {all_product.map((item,ind)=>{
                      if(props.category===item.category){
                        return <Item key ={ind} id={item.id} name={item.name} image={item.image}
                        new_price={item.new_price} old_price={item.old_price}/>
                      }else{
                        return null;
                      }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
            </div>
    )
}
 
export default ShopCategory;