import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

import * as Yup from "yup";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Validation Schema (Same as Backend Joi)
const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "name can only contain letters and numbers (No spaces or special characters)")
    .min(3, "name must be at least 3 characters long")
    .max(20, "name cannot exceed 20 characters")
    .required("name is required"),

  email: Yup.string()
    .email("Enter a valid email address (e.g., example@domain.com)")
    .matches(/^[^\s@]+@[^\s@]+\.(com|net)$/, "Only .com and .net domains are allowed")
    .required("Email is required"),


  password: Yup.string()
    .min(3, "Password must be at least 3 characters long")
    .max(30, "Password must not exceed 30 characters")
    .matches(/^[^\s]*$/, "Only letters (A-Z, a-z) and numbers (0-9) are allowed. No spaces.")
    .matches(/^[a-zA-Z0-9]*$/, "Only letters (A-Z, a-z) and numbers (0-9) are allowed.")
    .required("Password is required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  return (

    <div className="flex justify-center items-center min-h-screen ">
    <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Employee Registration</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Please fill in your details to get started</p>
  
      <Formik
    initialValues={{ name: "", email: "", password: "" }}
    validationSchema={validationSchema}
    onSubmit={async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/auth/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
  
        const data = await response.json();
        setLoading(false);
  
        if (response.ok) {
          toast.success(data.message);
          navigate('/login');  // Redirect to login page after successful signup
        } else {
          toast.error(data.message || "An error occurred");
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.message || "An error occurred");
      }
    }}
  >
    <Form className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <Field
          name="name"
          type="text"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 bg-gray-50"
          placeholder="Enter Your Name"
        />
        <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700">Work Email</label>
        <Field
          name="email"
          type="email"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 bg-gray-50"
          placeholder="Enter Your email"
        />
        <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700">Create Password</label>
        <div className="relative">
          <Field
            name="password"
            type={showPassword ? "text" : "password"}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 bg-gray-50"
            placeholder="Minimum 6 characters"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
      </div>
  
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition duration-200"
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <h3>
  If you already have an account, please{" "}
  <Link to="/login" className="text-teal-600 hover:underline font-semibold text-center">
    Login
  </Link>
</h3>

    </Form>
  </Formik>
  
    </div>
  </div>






    // <div className="flex justify-center items-center min-h-screen bg-purple-50 px-4e">
    //   <div className="relative flex flex-col rounded-xl bg-white shadow-lg p-6 w-full max-w-md">
    //     <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign Up</h2>
    //     <p className="text-gray-500 text-center mb-6">Welcome! Enter your details to register.</p>

    //     {/* ✅ Formik Handling */}
    //     <Formik
    //       initialValues={{ name: "", email: "", password: "" }}
    //       validationSchema={validationSchema}
    //       onSubmit={async (values) => {
    //         setLoading(true);
    //         console.log("values:", values);
    //         try {
    //           const response = await fetch(`${apiUrl}/auth/user`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(values),
    //           });

    //           const data = await response.json();
    //           setLoading(false);
    //           console.log("Response:", response, "data", data);
    //           if (response.ok) {  
    //             toast.success(data.message);
    //             navigate('/');
    //           } else {
    //             toast.error(data.message || "An error occurred while signing up");
    //           }
    //         } catch (error) {
    //           setLoading(false);
    //           console.log("Error:", error);
    //           toast.error(error.message || "An error occurred while signing up");
    //         }
    //       }}
    //     >
    //       <Form className="space-y-4">
    //         <div>
    //           <label className="block text-sm font-medium text-gray-700">Your Name</label>
    //           <Field
    //             name="name"
    //             type="text"
    //             className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //             placeholder="Enter your name"
    //           />
    //           <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
    //         </div>

    //         <div>
    //           <label className="block text-sm font-medium text-gray-700">Email</label>
    //           <Field
    //             name="email"
    //             type="email"
    //             className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //             placeholder="Enter your email"
    //           />
    //           <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
    //         </div>

    //         <div>
    //           <label className="block text-sm font-medium text-gray-700">Password</label>
    //           <div className='relative'>
    //             <Field
    //               name="password"
    //               type={showPassword ? "text" : "password"}
    //               className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //               placeholder="Enter your password"
    //             />
    //             <button
    //               type="button"
    //               className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none'
    //               onClick={() => { setShowPassword(!showPassword) }}
    //             >
    //               {showPassword ? <FaEyeSlash /> : <FaEye />}
    //             </button>
    //             <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
    //           </div>
    //         </div>

    //         <button
    //           type="submit"
    //           className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-md transition-all duration-300 disabled:bg-gray-500"
    //           disabled={loading}
    //         >
    //           {loading ? "Signing Up..." : "Sign Up"}
    //         </button>
    //       </Form>
    //     </Formik>
    //   </div>
    // </div>


  );
};

export default Signup;