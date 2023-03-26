import { useState } from "react";
import "./App.css";
import BrainEditor from "./pages/BrainEditor";
import BrainViewer from "./pages/BrainViewer";
import { indexes } from "./pages/indexes";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [menu, setMenu] = useState(indexes.login);
  const [account, setAccount] = useState({
    username: "",
    brains: [],
  });
  const [cBrain, setCBrain] = useState("");

  const isLoggedIn = () => {
    return account.username != "";
  };

  const selectBrain = (brain) => {
    setCBrain(brain);
    changeMenu(indexes.brainEditor);
  };

  const setUserLoggedIn = (username, brains) => {
    if (isLoggedIn()) {
      disconnect();
    }

    console.log("setting user logged in: " + username + " " + brains);
    if (!username) {
      return;
    }

    if (!brains) {
      brains = [];
    }

    setAccount({
      username: username,
      brains: brains,
    });

    changeMenu(indexes.brainViewer);
  };

  const changeMenu = (index) => {
    if (index == indexes.login || index == indexes.register) {
      setMenu(index);
    } else if (index == indexes.brainEditor || index == indexes.brainViewer) {
      if (isLoggedIn()) {
        setMenu(index);
      } else {
        setMenu(indexes.login);
      }
    }
  };

  const setBrains = (brains) => {
    setAccount({
      username: account.username,
      brains: brains,
    });
  };

  const disconnect = () => {
    setMenu(indexes.login);
    setAccount({
      username: "",
      brains: [],
    });
  };

  return (
    <div className="App">
      {menu == indexes.login ? (
        <Login
          setMenu={changeMenu}
          disconnect={disconnect}
          account={account}
          setUserLoggedIn={setUserLoggedIn}
        />
      ) : menu == indexes.register ? (
        <Register
          setMenu={changeMenu}
          disconnect={disconnect}
          account={account}
          isLoggedIn={isLoggedIn}
        />
      ) : menu == indexes.brainEditor ? (
        <BrainEditor
          setMenu={changeMenu}
          disconnect={disconnect}
          account={account}
          isLoggedIn={isLoggedIn}
          selectedBrain={cBrain}
          setBrains={setBrains}
        />
      ) : menu == indexes.brainViewer ? (
        <BrainViewer
          setMenu={changeMenu}
          disconnect={disconnect}
          account={account}
          isLoggedIn={isLoggedIn}
          selectBrain={selectBrain}
          setBrains={setBrains}
        />
      ) : (
        <div>404</div>
      )}
    </div>
  );
}

export default App;
