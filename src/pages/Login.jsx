import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../constants";
import { indexes } from "./indexes";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    console.log("loging in username: " + username + " password: " + password);
    const resp = await axios.post(SERVER_URL + "/login", {
      username: username,
      password: password,
    });

    setUsername("");
    setPassword("");

    if (resp.data.error) {
      setError(resp.data.error);
    } else {
      console.log(resp.data);
      const username = resp.data.username;
      const brains = resp.data.brains;
      props.setUserLoggedIn(username, brains);
    }
  };

  return (
    <div>
      Login
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div>{error}</div>}
      <div>
        <button onClick={login}>Login</button>
      </div>
      <div>
        <button onClick={() => props.setMenu(indexes.register)}>
          Register
        </button>
      </div>
    </div>
  );
}
