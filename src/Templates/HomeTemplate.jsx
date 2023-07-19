
import React from 'react'
import { connect } from 'react-redux'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

export const HomeTemplate = (props) => {
  let total = props.cart.reduce((tot,item)=>{
    return tot += item.num;
  },0)
  return (
    <div>
        <Header number={total}/>
        <div style={{minHeight:'80vh'}}>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cart: state.shopReducer.cart
})

export default connect(mapStateToProps)(HomeTemplate)
