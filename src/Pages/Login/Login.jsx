import { useFormik } from 'formik'
import React from 'react'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'
import { loginActionApi } from '../../Redux/reducers/userReducer'
import { useDispatch } from 'react-redux'


const Login = () => {
  const dispatch = useDispatch();
  const formLogin = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:yup.object().shape({
      email:yup.string().required("Email cannot be blank!").email("Email is invalid!"),
      password:yup.string().required("Password cannot be blank!").min(8,"Password must contain between 8 and 32 characters").max(32,"Password must contain between 8 and 32 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,"Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character"),
    }),
    onSubmit:(values) => {
      const action = loginActionApi(values);
      dispatch(action);
    }
  })

  return (
    <div>
      <div className='login-carousel bg-page'>
        <div className='container p-140 text-center'>
          <h2 className='text-white fs-58 fw-4 mb-3'>LOGIN</h2>
          <p className='fs-24'><NavLink to="/home" className="text-white text-hover">HOME</NavLink><span className='text-orange'> // LOGIN</span></p>
        </div>
      </div>

      <div className='p-log'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8 m-auto'>
              <div className='login-title text-center'>
                <h2 className='title'>Login</h2>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='login-form'>
                <form action="#" onSubmit={formLogin.handleSubmit}>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='form-group'>
                        <label htmlFor="email">
                          Email address 
                          <span className='required'> *</span>
                        </label>
                        <input type="email" name='email' className='form-control' id='email' onInput={formLogin.handleChange} onBlur={formLogin.handleBlur}/>
                        {formLogin.errors.email && <p className='text-danger mt-1'>{formLogin.errors.email}</p>}
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='form-group'>
                        <label htmlFor="password">
                          Password 
                          <span className='required'> *</span>
                        </label>
                        <input type="password" name='password' className='form-control' id='password' onInput={formLogin.handleChange} onBlur={formLogin.handleBlur}/>
                        {formLogin.errors.password && <p className='text-danger mt-1'>{formLogin.errors.password}</p>}
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='form-group'>
                        <button className='btn-login' type='submit'>Login</button>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group account-info-group mb-0">
                        <div className="rememberme-account">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label text-hover" for="defaultCheck1">Remember me</label>
                          </div>
                        </div>
                        <a className="lost-password text-hover" href="#/">Lost your password?</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login