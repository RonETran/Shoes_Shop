import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import ProductCart from "../../Components/ProductCart/ProductCart";
import axios from "axios";
import { USER_LOGIN, getStorageJSON } from "../../Util/config";

export const Cart = (props) => {

  const navigate = useNavigate();
  const userLogin = getStorageJSON(USER_LOGIN);

  const mergeObj = (arr,email) => {
    const merge = {
      orderDetail: arr,
      email: email
    };
    return merge;
  }

  const submitOrder = async () => {
    let newProdCart = props.cart.map((item)=>{
      const {id} = item;
      return {productId:id, quantity:0}
    });
    const newData = mergeObj(newProdCart,userLogin.email)
    const res = await axios({
      url:'https://shop.cyberlearn.vn/api/Users/order',
      method: 'POST',
      data: newData
    });
    alert(res.data.message);
    window.location.reload();
  }

  const checkLogin = () => {
    const userLogin = getStorageJSON(USER_LOGIN);
    if(!userLogin) {
      alert('Đăng nhập để vào trang này!');
      navigate('/login');
    }
  }

  useEffect(()=>{
    checkLogin(); 
  },[])

  return (
    <div>
      <div className="detail-carousel bg-page">
        <div className="container p-140 text-center">
          <h2 className="text-white fs-58 fw-4 mb-3">SHOPPING CART</h2>
          <p className="fs-24">
            <NavLink to="/home" className="text-white text-hover">
              HOME
            </NavLink>
            <span className="text-orange"> // SHOPPING CART</span>
          </p>
        </div>
      </div>

      <div className="cart m-cart">
        <div className="container">
          <table className="table text-center">
            <thead className="bg-thead">
              <tr>
                <td className="product-remove td-prod"></td>
                <td className="product-img td-prod"></td>
                <td className="product-name td-prod">Product</td>
                <td className="product-price td-prod">Price</td>
                <td className="product-quantity td-prod">Quantity</td>
                <td className="product-total td-prod">Total</td>
              </tr>
            </thead>
            <tbody>
              {props.cart.map((item,index)=>{
                return <ProductCart key={index} itemCart={item}/>
              })}

              <tr className="actions">
                <td colSpan="6" className="border-0 p-act ver-mid">
                  <div className="d-flex justify-content-between">
                    <div className="act-left">
                      <NavLink to="/home" className="continue btn-left">CONTINUE SHOPPING</NavLink>
                    </div>
                    <div className="act-right">
                      <button className="btn-right" onClick={submitOrder}>SUBMIT ORDER</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.shopReducer.cart,
  order: state.shopReducer.order
});

export default connect(mapStateToProps)(Cart);
