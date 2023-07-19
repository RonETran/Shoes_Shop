import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Product from '../../Components/Product/Product';

export const Search = (props) => {
  const _ = require('lodash');
  const [arrProductSearch, setProductSearch] = useState(props.arrProductSearch);
  const [keyword,setKeyword] = useState('');

  const filterDescending = useCallback(()=>{
    let desc = _.orderBy(arrProductSearch,['price'],['desc']);
    setProductSearch(desc);
  },[arrProductSearch])

  const filterAscending = useCallback(()=>{
    let asc = _.orderBy(arrProductSearch,['price'],['asc']);
    setProductSearch(asc);
  },[arrProductSearch])
  
  const handleChange = (e) => {
    setKeyword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const getProductSearch = async () => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`,
      method: "GET",
    });
    setProductSearch(result.data.content);
  };

  useEffect(() => {
    getProductSearch();
  }, [keyword]);

  return (
    <div>
      <div className="profile-carousel bg-page">
        <div className="container p-140 text-center">
          <h2 className="text-white fs-58 fw-4 mb-3">SEARCH</h2>
          <p className="fs-24">
            <NavLink to="/home" className="text-white text-hover">
              HOME
            </NavLink>
            <span className="text-orange"> // SEARCH</span>
          </p>
        </div>
      </div>

      <div className='py-5'>
        <div className='container'>
          <form className="position-relative w-form-search" onSubmit={handleSubmit}>
            <input type="search" name='keyword' id='keyword' className="form-control search-input" placeholder="Search" value={keyword} onChange={handleChange}/>
            <button className="btn-search" type="submit"><i className="fa fa-search icon-search"/></button>
          </form>
          <div className='filter-price'>
            <button onClick={filterDescending}>Descending</button>
            <button onClick={filterAscending}>Ascending</button>
          </div>
          <div className='product-list mt-5'>
            <div >
              <div className='product-item row'>
                {arrProductSearch.map((item)=>{
                  return <Product item={item}/>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => ({
  arrProductSearch: state.shopReducer.arrProductSearch
})

export default connect(mapStateToProps)(Search)