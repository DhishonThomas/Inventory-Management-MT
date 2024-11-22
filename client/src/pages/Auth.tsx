import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import { useState } from "react";
import Button from "../components/ui/Button";
import Wrapper from "../components/ui/Wrapper";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import {
  validateEmail,
  validateFullName,
  validatePassword,
} from "../utils/validator";
import userApi from "../utils/axiosInterceptors/userApiService";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user);

  if (user.isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  const handleSubmit =async() => {
    const checkEmail = validateEmail(email);
    const checkPassword = validatePassword(password);

    if (checkEmail != null) {
      toast.error(checkEmail.errMessage, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    if (checkPassword != null) {
      toast.error(checkPassword.errMessage, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    if (!isLogin) {
      const checkName = validateFullName(name);

      if (checkName != null) {
        toast.error(checkName.errMessage, {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
        return;
      }
        const response=await userApi.post("/user/signUp",{name:name,email:email,password:password})

if(!response.data.status){
  toast.error(response.data.message, {
    position: "top-center",
    autoClose: 5000,
    theme: "dark",
  });
}

console.log("response.data",response.data.status)
        if(response.data.status){
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
          });
          navigate("/")
        }
    }
  };

  return (
    <Wrapper
      title={isLogin ? `Login` : `SignUp`}
      minHeight="min-h-screen"
      maxWidthMd
    >
      <Header />

      {!isLogin && (
        <InputField
          name="name"
          type="text"
          value={name}
          label="Name"
          bgColor="bg-gray-800"
          onchange={(e) => setName(e.target.value)}
        />
      )}
      <InputField
        name="Email"
        type="email"
        value={email}
        bgColor="bg-gray-800"
        label="Email"
        onchange={(e) => setEmail(e.target.value)}
      />
      <InputField
        name="Password"
        type="password"
        bgColor="bg-gray-800"
        value={password}
        label="Password"
        onchange={(e) => setPassword(e.target.value)}
      />

      <Button
        onHover="hover:bg-slate-800"
        bgColor="bg-gray-600"
        text={isLogin ? "Login" : "Sign Up"}
        type="submit"
        onclick={handleSubmit}
      />
      <div className="text-center mt-4 ">
        {!isLogin ? (
          <p>
            Already have an account?{" "}
            <Button
              textColor="text-blue-500 underline"
              onclick={() => setIsLogin(true)}
              text="Log in"
              onHover="hover:cursor-pointer"
            />
          </p>
        ) : (
          <p>
            Don’t have an account?{" "}
            <Button
              textColor="text-blue-500 underline"
              onclick={() => setIsLogin(false)}
              text="Sign up"
              onHover="hover:cursor-pointer"
            />
          </p>
        )}
      </div>
    </Wrapper>
  );
};

export default Auth;
