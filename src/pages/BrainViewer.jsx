import axios from "axios";
import { SERVER_URL } from "../constants";
import BrainViewerObject from "./BrainViewerObject";

export default function BrainViewer(props) {
  const createNewBrain = async () => {
    const resp = await axios.post(SERVER_URL + "/brain", {
      username: props.account.username,
    });

    props.setBrains(resp.data);
  };

  console.log(props.account.brains);
  return (
    <div>
      BrainViewer
      <br />
      <button onClick={createNewBrain}>Create New Brain</button>
      <br />
      <br />
      <div>
        {props.account.brains.map((brain) => (
          <li>
            <BrainViewerObject selectBrain={props.selectBrain} id={brain} />
          </li>
        ))}
      </div>
    </div>
  );
}
