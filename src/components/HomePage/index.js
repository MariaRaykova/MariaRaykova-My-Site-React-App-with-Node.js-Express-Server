import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import PageWrapper from "../PageWrapper";
import AuthContext from "../../contexts/AuthContext";
import SwiperCoverflow from "../core/SwiperCoverflow";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getAllProducts, getAllProductsByCategory } from "../../redux/action/productsActions";
import SwiperCollection from "../core/Collection";

const Home = (props) => {

  return (
    <PageWrapper>
        <SwiperCoverflow />
        <SwiperCollection />
    </PageWrapper>
  );
};
export default Home;
