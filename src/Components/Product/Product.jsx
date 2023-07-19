import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addToCartAction } from '../../Redux/reducers/shopReducer';

export const Product = (props) => {
    let {item} = props;
    const dispatch = useDispatch();

    return (
        <div className='item col-10 col-sm-6 col-lg-4 col-xl-3 mb-5' key={item.id}>
            <div className='img mb-2 h-270 bg-product position-relative'>
                <img src={item.image} alt="" className='position-img w-img-product'/>
                <ul className='d-flex m-0 position-list'>
                    <li className='px-3 py-2 bg-footer text-white bd-right li-icon' onClick={()=>{
                        const action = addToCartAction(item);
                        dispatch(action);
                    }}>ADD TO CART</li>
                    <li className='p-li-icon bg-footer text-white bd-right li-icon'><NavLink to={`/detail/${item.id}`} className="text-white"><i class="fa fa-eye"></i></NavLink></li>
                    <li className='p-li-icon bg-footer text-white bd-right li-icon'><i class="fa fa-heart"></i></li>
                </ul>
            </div>
            <div className='info'>
                <p className='m-0 fs-20'>{item.name}</p>
                <p className='text-orange fs-20'>{item.price}$</p>
            </div>
        </div>
  )
}

const mapStateToProps = (state) => ({
  cart: state.shopReducer.cart
})

export default connect(mapStateToProps)(Product)