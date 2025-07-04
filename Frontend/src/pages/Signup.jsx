import {useForm}from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z } from "zod"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { NavLink } from "react-router"
import { useEffect } from "react"
import { registerUser } from "../authSlice"
import AnimateBg from "../components/bg_animation"
const signupSchema = z.object({
    firstName:z.string().min(3,"Minimum 3 characters"),
    emailId:z.string().email("Invalid Email"),
    password:z.string().min(8,"Weak Password")
})

function Signup(){
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm({resolver:zodResolver(signupSchema)})


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuthenticated,loading,error}=useSelector((state)=>state.auth)

    useEffect(()=>{
      if(isAuthenticated){
        navigate('/')
      }
    },[isAuthenticated])


    const onSubmit = (data)=>{
    dispatch(registerUser(data)) 
    
 }
    return(
       <div className="min-h-screen flex items-center justify-center p-4">
        <AnimateBg/>
        <div className="card w-96 shadow-xl bg-white/10 backdrop-blur-lg border border-white/20">
            <div className="card-body">
                <h2 className="card-title justify-center text-3xl">CodeDrill</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label mb-1">
                            <span className="label-text">First Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="First Name"
                            className={`input input-bordered ${errors.firstName && 'input-error'}`}
                            {...register('firstName')}
                        />
                        {errors.firstName &&(<span className="text-error">{errors.firstName.message}</span>)}
                    </div>

                    <div className="form-control  mt-4">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered ${errors.emailId && 'input-error'}`}
                {...register('emailId')}
              />
              {errors.emailId && (
                <span className="text-error">{errors.emailId.message}</span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered ${errors.password && 'input-error'}`}
                {...register('password')}
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>
            <div className="form-control mt-6 flex justify-center">
                <button type="submit" className="btn btn-primary">SignUp</button>
            </div>

                </form>
                {/* Login Re-direct */}
                <div className="text-center mt-6">
            <span className="text-sm bg-gray-700 shadow-xl p-2">
              Already have an account?{' '}
              <NavLink to="/login" className="link link-primary">
                Login
              </NavLink>
            </span>
          </div>
            </div>

        </div>

       </div>
    )
}

export default Signup