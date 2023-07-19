import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { http } from '../../Util/config'

const Register = () => {

  const navigate = useNavigate();

  const registerForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      gender: 'true',
      phone: '',
      passwordConfirm: ''
    },

    validationSchema:yup.object().shape({
      email:yup.string().required("Email cannot be blank!").email("Email is invalid!"),
      name:yup.string().required("Name cannot be blank!"),
      phone:yup.number().required("Phone number cannot be blank!"),
      password:yup.string().required("Password cannot be blank!").min(8,"Password must contain between 8 and 32 characters").max(32,"Password must contain between 8 and 32 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,"Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character"),
      passwordConfirm:yup.string().required("Please enter your password again.").oneOf([yup.ref('password')],"The confirmation password does not match")
    }),

    onSubmit: async (values) => {
      try{
        const res = await http.post('/api/Users/signup',values);
        alert(res.data?.message);
        navigate('/login')
      }
      catch(err){
        alert(err.response.data.message)
      }
    }
  })

  return (
    <div>
      <div className='register-carousel bg-page'>
        <div className='container p-140 text-center'>
          <h2 className='text-white fs-58 fw-4 mb-3'>REGISTER</h2>
          <p className='fs-24'><NavLink to="/home" className="text-white text-hover">HOME</NavLink><span className='text-orange'> // REGISTER</span></p>
        </div>
      </div>

      <div className='p-register'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8 m-auto'>
              <div className='register-title text-center'>
                <h2 className='title'>Register</h2>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='register-form'>
                <form action="#" onSubmit={registerForm.handleSubmit}>
                  <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                      <div className='form-group'>
                        <label htmlFor="email">
                          Email
                          <span className='required'> *</span>
                        </label>
                        <input type="email" className='form-control' id='email' name='email' onInput={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
                        {registerForm.errors.email && <p className='text-danger mt-1'>{registerForm.errors.email}</p>}
                      </div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                      <div className='form-group'>
                        <label htmlFor="name">
                          Name
                          <span className='required'> *</span>
                        </label>
                        <input type="text" className='form-control' id='name' name='name' onInput={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
                        {registerForm.errors.name && <p className='text-danger mt-1'>{registerForm.errors.name}</p>}
                      </div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                      <div className='form-group'>
                        <label htmlFor="password">
                          Password
                          <span className='required'> *</span>
                        </label>
                        <input type="password" className='form-control' id='password' name='password' onInput={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
                        {registerForm.errors.password && <p className='text-danger mt-1'>{registerForm.errors.password}</p>}
                      </div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                      <div className='form-group'>
                        <label htmlFor="phone">
                          Phone number
                          <span className='required'> *</span>
                        </label>
                        <input type="text" className='form-control' id='phone' name='phone' onInput={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
                        {registerForm.errors.phone && <p className='text-danger mt-1'>{registerForm.errors.phone}</p>}
                      </div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                      <div className='form-group'>
                        <label htmlFor="confirm">
                          Password confirm
                          <span className='required'> *</span>
                        </label>
                        <input type="password" className='form-control' id='confirm' name='passwordConfirm' onInput={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
                        {registerForm.errors.passwordConfirm && <p className='text-danger mt-1'>{registerForm.errors.passwordConfirm}</p>}
                      </div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                      <div className='form-group'>
                        <p>Gender</p>
                        <div className='h-gender'>
                          <input type="radio" className='form-check-input cus-check-input' name='gender' id='gender1' value={true} onInput={registerForm.handleChange}/>
                          <label htmlFor="gender1" className='me-4'>Male</label>
                          <input type="radio" className='form-check-input cus-check-input' name='gender' id='gender2' value={false} onInput={registerForm.handleChange}/>
                          <label htmlFor="gender2">Female</label>
                        </div>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='form-group'>
                        <button className='btn-sub' type='submit' disabled={!registerForm.isValid}>Submit</button>
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

export default Register