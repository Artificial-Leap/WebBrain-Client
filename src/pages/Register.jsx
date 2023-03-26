import axios from "axios";
import { useState } from "react";
import { SERVER_URL } from "../constants";
import { indexes } from "./indexes";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    const resp = await axios.post(SERVER_URL + "/register", {
      username: username,
      password: password,
    });

    setUsername("");
    setPassword("");

    if (resp.data.error) {
      setError(resp.data.error);
    } else {
      props.setMenu(indexes.login);
    }
  };

  return (
    <div>
      Register
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
        <button onClick={register}>Register</button>
      </div>
      <div>
        <button onClick={() => props.setMenu(indexes.login)}>Login</button>
      </div>
    </div>
  );
}
