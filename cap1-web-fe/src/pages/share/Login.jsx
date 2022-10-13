import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const { error } = await signIn({ email, password });
      // await supabase
      //   .from("profiles")
      //   .insert([{ id: 1, displayName, email, password }]);

      if (error) throw error;
      toast.success("Login success.", {
        duration: 5000,
      });
      navigate("/");
    } catch (error) {
      toast.error("User account or password incorrect!", {
        duration: 5000,
      });
    }
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">SMART GRADE 5</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button>Sign in</button>
          {err && <span style={{ color: "red" }}>Something went wrong !</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
