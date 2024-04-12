import React from "react";
import Popular from '../components/Popular/Popular.jsx';
import Offers from "../components/Offers/Offers.jsx";
import NewCollection from "../components/NewCollection/NewCollection.jsx";
import NewsLetter from "../components/NewsLetter/NewsLetter.jsx";
import Hero from "../components/Hero/Hero.jsx";
const Shop = () =>{
    return (
        <div>
     <Hero />
     <Popular />
     <Offers />
    <NewCollection />
    <NewsLetter />
        </div>
    )
}

export default Shop;