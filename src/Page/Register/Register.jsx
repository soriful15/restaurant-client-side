import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'
import registerFrom from '../../assets/83521-register-anumator.json'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';
const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(data)  

        if (data.password !== data.confirmPassword) {
            return setError('Password is not Confirm')
        }

        createUser(data.email, data.password)
            .then(result => {
                const createdUser = result.user

                console.log(createdUser)
                updateUserProfile(data.name, data.photoURL, data.email)
                    .then(() => {
                        // console.log('update Profile')
                        const saveUser = { name: data.name, photoURL: data.photoURL, email: data.email, }
                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    setError('')
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created Successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                    })
                    .catch((error) => {
                        console.log(error.message)

                    })


            })

            .catch((error) => {
                console.log(error.message)
            })


    };

    return (
        <>

<Helmet>
        <title>Restaurant  | Register  Page</title>
      </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left lg:ml-10">
                        <h1 className="text-5xl font-bold">Register now!</h1>

                        <div className='md:w-96'>
                            <Lottie animationData={registerFrom} loop={true} />
                        </div>

                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" name="name" placeholder="Your Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}

                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input {...register("photoURL", { required: true })} type="text" name="photoURL" placeholder="Enter your Photo url" className="input input-bordered" />
                                {errors.PhotoURL && <span className='text-red-600'>PhotoUrl is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" {...register("password", { required: true, minLength: 6, maxLength: 16, pattern: /(?=.*[A-Z])(?=.*?[#?!@$ %^&*-])/ })} />
                                {errors.password?.type === 'required' && <p className='text-red-600'>password name is required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-600'>password must be 6 Characters</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-red-600'>password must be less then 6 Characters</p>}
                                {errors.password?.type === 'pattern' && <p className='text-red-600'>password must be  one upperCase & one special Characters</p>}
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input {...register("confirmPassword", { required: true })} type="password" name="confirmPassword" placeholder="Confirm Password" className="input input-bordered" />
                                {errors.confirmPassword?.type === 'required' && <span className='text-red-600'>Confirm Password is required</span>}
                                <p className='text-red-600'>{error}</p>
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="SingUp" />
                            </div>
                            <p className='text-center'>AlReady have an Account? <Link to='/login'><span className='text-green-500'>login</span></Link></p>
                            <SocialLogin></SocialLogin>
                        </form >
                    </div>



                </div>
            </div>
        

        </>
    );
};

export default Register;