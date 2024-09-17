import { signupInput } from '@omsharma/mediumclone'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SignUp_URL } from '../Cofig/Backend_URL'
export default function SignUp() {
  const navigate = useNavigate()
  const [Credentials, setCredentials] = useState<signupInput>(
    {
      name: "",
      email: "",
      password: ""
    }
  )

  async function sendRq() {
    try {
      const response = axios.post(`${SignUp_URL}`)
      const jwt = (await response).data
      localStorage.setItem("token", jwt)
      navigate("/blog")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 flex justify-center items-center bg-mediumWhite">

          <form className="max-w-sm mx-auto">
            <div className="text-black font-serif font-extrabold items-center text-[2.3rem] mt-5 ">Create an Account</div>
            <div className="text-gray-400 pb-10 ">Already have an Account  <Link to="/signin" className=" underline">Login</Link></div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
              <input
                type="name"
                id="name" 
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full px-10 py-2  dark:text-black" placeholder="xyz" required />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 ">Your Email</label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full px-10 py-2  dark:text-black" placeholder="name@email.com" required />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 ">Your Password</label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border text-left border-gray-300 text-sm rounded-lg block w-full px-10 py-2  dark:text-black" placeholder="min 8 letter" required />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-black-300">Remember me</label>
            </div>
            <button
              type="submit"
              onSubmit={sendRq}
              className="text-white mb-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>

        </div>


        <div className="pr-3  flex-1 flex flex-col justify-center items-center bg-customGray p-6 bg-mediumGrey">
          <blockquote className="text-lg italic font-semibold text-gray-900 dark:text-black text-center">
            <p>"The customer service I received was exceptional. The support team went above and beyond to address my concern."</p>
          </blockquote>
          <p className="mt-4 text-sm font-medium text-gray-700">— Om Sharma, CEO of Google</p>
        </div>
      </div>

    </>
  )
}
