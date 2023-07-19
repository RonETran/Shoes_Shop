import React, { useEffect } from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import Product from '../../Components/Product/Product'
import { addToCartFromDetailAction, getDetailAction, quantityDetailAction } from '../../Redux/reducers/shopReducer'

export const Detail = (props) => {

  const params = useParams();
  const dispatch = useDispatch();
  const payload1 = {
    id:props.productDetail.id,
    valid1: false
  }
  const payload2 = {
    id:props.productDetail.id,
    valid2: true
  }

  const getProductDetail = async () => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${params.id}`,
      method: "GET",
    });
    const action = getDetailAction(result.data.content);
    dispatch(action)
  };

  useEffect(() => {
    getProductDetail(params.id);
  }, [params.id]);

  return (
    <div>
      <div className='detail-carousel bg-page'>
        <div className='container p-140 text-center'>
          <h2 className='text-white fs-58 fw-4 mb-3'>PRODUCT DETAILS</h2>
          <p className='fs-24'><NavLink to="/home" className="text-white text-hover">HOME</NavLink><span className='text-orange'> // PRODUCT DETAILS</span></p>
        </div>
      </div>

      <div className='product-detail m-10'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-5 bg-product mb-5 w-400 h-400 position-relative'>
              <img src={props.productDetail.image} alt="" className='w-detail position-img'/>
            </div>
            <div className='col-lg-6 col-sm-8 ms-5'>
              <h3 className='fs-24 mb-3'>{props.productDetail.name}</h3>
              <p className='text-orange fs-24'>{props.productDetail.price}$</p>
              <hr />
              <div className='desc mb-4'>
                <p>{props.productDetail.description}</p>
              </div>
              <div className='mb-4'>
                <label htmlFor="size" className='mb-1'>Size</label>
                <br />
                <select name="size" id="size" className='p-size'>
                  <option value="1">36</option>
                  <option value="2">37</option>
                  <option value="3">38</option>
                  <option value="4">39</option>
                  <option value="5">40</option>
                  <option value="6">41</option>
                  <option value="7">42</option>
                </select>
              </div>
              <div className='quantity'>
                <div className="pro-detail-qty ver-mid">
                  <div className="dec-detail qty-btn-detail" onClick={()=>{
                    const action = quantityDetailAction(payload1);
                    dispatch(action);
                  }}>-</div>
                  <div className="inc-detail qty-btn-detail" onClick={()=>{
                    const action = quantityDetailAction(payload2);
                    dispatch(action);
                  }}>+</div>
                  <input type="text" value={props.productDetail.num}/>
                </div>
                <button className='p-add ver-mid' onClick={()=>{
                  const action = addToCartFromDetailAction(props.productDetail);
                  dispatch(action);
                }}>ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='related-prod'>
        <div className='container'>
          <div className='text-center mb-5'>
            <h3 className='fs-48'>Related Products</h3>
            <p className='fs-18'>There are many variations of passages of Lorem Ipsum available</p>
          </div>
          <div className='related-items row '>
            {props.productDetail.relatedProducts?.map((item)=>{
              return <Product item={item}/>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  productDetail: state.shopReducer.productDetail
})

export default connect(mapStateToProps)(Detail)