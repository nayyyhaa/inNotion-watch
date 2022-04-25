import { loginService, signupService } from "services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts";
import { toast } from "react-toastify";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth, setUser } = useAuth();
  const loginHandler = async (e, email, password) => {
    try {
      e.preventDefault();
      const [token, userData] = await loginService("/api/auth/login", email, password);
      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(userData));
      setAuth({ token, isAuth: true });
      toast.success(`Welcome ${userData.firstName}!`);
      navigate("/");
    } catch (err) {
      toast.error("User doesn't exists. Sign up now!");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    setAuth({ token: "", isAuth: false });

    navigate("/login");
  };

  const signupHandler = async (e, email, password, firstName, lastName) => {
    try {
      e.preventDefault();
      const [token, userData] = await signupService("/api/auth/signup", email, password, firstName, lastName);
      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(userData));
      setAuth({ token, isAuth: true });
      toast.success(`Welcome ${userData.firstName}!`);
      navigate("/");
    } catch (err) {
      toast.error("User already exists! Try logging in.");
    }
  };
  return { loginHandler, logoutHandler, signupHandler };
};
