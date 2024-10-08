import { signinInput } from "@omsharma/mediumclone";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignIn_URL } from "../Cofig/Backend_URL";

export default function SignIn() {
  const navigate = useNavigate()
  const [Credentials, setCredentials] = useState<signinInput>(
    {
      email: "",
      password: ""
    }
  )

  const onHandel = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setCredentials({...Credentials, [e.target.name]:e.target.value})
  }

  async function sendRq(e : React.FormEvent) {
    e.preventDefault()
    try {
      const response = await axios.post(`${SignIn_URL}`, Credentials)
      if (response.status === 200) {
        const jwt = response.data;
  
        // Store JWT in localStorage and navigate to the home page
        localStorage.setItem("token", jwt);
        navigate("/");
      } else {
        // Handle invalid status (not 200)
        console.log("Login failed: Invalid credentials");
        
      }
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex justify-center items-center bg-mediumWhite">

        <form className="max-w-sm mx-auto" onSubmit={sendRq}>
          <div className="text-black font-serif font-extrabold items-center text-[2.3rem]  ">LogIn Your Account</div>
          <div className="text-gray-400 pb-10">Don't Have Account  <Link to="/signup" className=" underline">SignUp</Link></div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 ">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={Credentials.email}
              onChange={onHandel}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full px-10 py-2  dark:text-black" placeholder="name@email.com" required />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 ">Your Password</label>
            <input type="password" name="password" onChange={onHandel} value={Credentials.password} id="password" className="bg-gray-50 border text-left border-gray-300 text-sm rounded-lg block w-full px-10 py-2  dark:text-black" placeholder="min 8 letter" required />
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
          <button type="submit"
           
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

      </div>
    </div>
  )
}
