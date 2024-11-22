import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import { useState } from "react";
import Button from "../components/ui/Button";
import Wrapper from "../components/ui/Wrapper";
import Header from "./Header";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [name,setName]=useState("")

  const user = useSelector((state: RootState) => state.user);

  if (user.isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  const handleLogin = () => {
    console.log(password, email);
    alert("");
  };

  return (
    <Wrapper
      title={isLogin ? `Login` : `SignUp`}
      minHeight="min-h-screen"
      maxWidthMd
    >
      <Header />

{!isLogin&&
  <InputField
        name="name"
        type="text"
        value={name}
        label="Name"
        onchange={(e) => setName(e.target.value)}
      />
}
      <InputField
        name="Email"
        type="email"
        value={email}
        label="Email"
        onchange={(e) => setEmail(e.target.value)}
      />
      <InputField
        name="Password"
        type="password"
        value={password}
        label="Password"
        onchange={(e) => setPassword(e.target.value)}
      />

      <Button
        onHover="hover:bg-slate-500"
        bgColor="bg-gray-400"
        text={"Login"}
        type="submit"
        onclick={handleLogin}
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
