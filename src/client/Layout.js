import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import injectContext from "./store/appContext";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Account from "./views/Account";
import Favorites from "./views/Favorites";
import FavoriteRecipe from "./views/FavoriteRecipe.jsx";
import Category from "./views/Category";
import About from "./views/About";
import Signup from "./views/Signup";

const Layout = ()=>{

    const basename = process.env.BASENAME || "";

    return(
        <div>
            <BrowserRouter basename={basename}>
                <NavigationBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/account/:id' element={<Account />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/favorite/:id' element={<FavoriteRecipe />} />
                    <Route path='/category/:category' element={<Category />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )

};

export default injectContext(Layout);