import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Product from '../../Components/Product/Product'

export const Home = (props) => {
    
  const [arrProduct, setArrayProduct] = useState(props.arrProduct);

  const getAllProduct = async () => {
    const result = await axios({
      url: "https://shop.cyberlearn.vn/api/Product",
      method: "GET",
    });
    setArrayProduct(result.data.content);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div>
        <div className='home-carousel bg-carousel'>
            <div className='container'>
                <div className='p-carousel'>
                    <p className='fs-24 text-white m-0'>UP TO 30% OFF</p>
                    <h2 className='text-white fs-90 mb-5'><span className='fs-58 fw-4'>EXCLUSIVE<br/></span>NEW SHOES</h2>
                    <button className='button'><span></span>Shop Now</button>
                </div>
            </div>
        </div>

        <div className='product-list mt-5'>
            <div className='container'>
                <div className='product-title text-center mb-5'>
                    <h2 className='fs-48'>Featured Items</h2>
                    <p className='fs-18'>There are many variations of passages of Lorem Ipsum available</p>
                </div>
                <div className='product-item row'>
                    {arrProduct.map((item,index)=>{
                        return <Product key={index} item={item}/>
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
    arrProduct: state.shopReducer.arrProduct
})

export default connect(mapStateToProps)(Home)
