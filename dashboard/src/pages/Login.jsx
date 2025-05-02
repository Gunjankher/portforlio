import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAllUserErrors, login } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Password</Label>
                <Link
                  to="/password/forgot"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Loggin In"} />
            ) : (
              <Button
                onClick={() => handleLogin(email, password)}
                className="w-full"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img src="data:image/jpeg;base64,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" alt="login" />
      </div>
    </div>
  );
};

export default Login;
