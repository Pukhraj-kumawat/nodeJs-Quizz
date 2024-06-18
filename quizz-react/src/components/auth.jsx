import React, { useState,createContext,useContext } from 'react';
import axios from 'axios';
import TextInput from './textInput';
import { useNavigate } from 'react-router-dom';
import { useData } from './dataContext';

const AuthPage = (props) => {
  
  // const { userDataContext, setUserDataContext } = useData();
  const {setIsLoggedIn} = props.data;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [mobileNo,setMobileNo] = useState('')


  const handleToggleForm = () => {
    setIsLogin(prevState => !prevState);
  };


const handleSubmit = async (e) => {

    e.preventDefault();
    
    try {             
      
      const response = await axios.post(
        isLogin ? 'http://localhost:1000/login':'http://localhost:1000/signUp',
        {
          
          first_name:firstName,
          last_name:lastName,
          email:email,
          confirm_password:confirmPassword,
          password:password,
          
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      )     
                      

    if(!response.status === 200){      
      throw new Error(response.error)
    }  



    localStorage.setItem('isLoggedIn','true')

    setIsLoggedIn(true)
    

    //   axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

    //   navigate('/',{ state: { jwtToken: response.data } })                

      // window.location.reload();

    } catch (error) {          

      console.log(error);
      if (error.response.status === 404) {
        alert('User not found with the given email');
      } else if (error.response.status === 401) {
        alert('Password did not match');
      } else {
        console.log(error);
        alert('An authentication error occurred. Please try again.');
      }

    }
    
  }


  return (
  <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{isLogin ? 'Sign in to your account' : 'Create an account'}</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">

          {!isLogin && (
            <>
              <TextInput inputId = 'first-name' inputName = 'first-name' inputType = 'text' inputPlaceholder ='First name' setState = {setFirstName} value = {firstName} />

              <TextInput inputId = 'last-name' inputName = 'last-name' inputType = 'text' inputPlaceholder ='Last name' setState = {setLastName} value = {lastName} />  
              
            </>
          )}

          <TextInput inputId = 'email' inputName = 'email' inputType = 'text' inputPlaceholder ='Email' setState = {setEmail} value = {email}/> 

            <TextInput inputId = 'password' inputName = 'password' inputType = 'password' inputPlaceholder ='Password' setState = {setPassword} value = {password} /> 

            {!isLogin && (
              <TextInput inputId = 'confirm-password' inputName = 'confirm-password' inputType = 'password' inputPlaceholder ='Confirm Password' setState = {setConfirmPassword} value = {confirmPassword} /> 
            )}

          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={handleToggleForm}>
                {isLogin ? 'Create an account' : 'Sign in'}
              </button>
            </div>
          </div>

          <div>

            
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>

          </div>
        </form>
      </div>
    </div>
    </>);
};

export default AuthPage;
