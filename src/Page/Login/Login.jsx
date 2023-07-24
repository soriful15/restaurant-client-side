import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'
import login from '../../assets/94113-login.json'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';
const Login = () => {
    const { singIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || '/';
    const { register, handleSubmit, reset, } = useForm();
    const onSubmit = data => {
        console.log(data)


        singIn(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user
                console.log(loggedUser);
                reset()
                Swal.fire({
                    title: 'Login Successfully',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate(from, { replace: true })
            })

            .catch(error => {
                console.log(error);

            })



    }

    return (
        <>

<Helmet>
        <title>Restaurant | Login  Page</title>
      </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <div className=''>
                            <div className='md:w-96'>
                                <Lottie animationData={login} loop={true} />
                            </div>
                        </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" {...register("password", { required: true })} />

                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                            <p className='text-center mb-6'>New Here? <Link to='/register'><span className='text-green-500'>Create an account</span></Link></p>
                            <SocialLogin></SocialLogin>
                        </form >
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;