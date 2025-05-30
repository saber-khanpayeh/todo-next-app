import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);
  const credentialsSignin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res?.error) {
      toast.success("Your logged in successfully!", {
        autoClose: 1000,
      });
      setTimeout(()=>{
        window.location.href="/";
      },1000);
    }else{
      toast.error(res?.error);
    }
  };
  return (
    <div className="signin-form">
      <h3>Login Form</h3>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={credentialsSignin}>Login</button>
      <div>
        <p>Don&#39;t have account?</p>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default SigninPage;
