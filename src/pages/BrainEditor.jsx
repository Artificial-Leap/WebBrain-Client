import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../constants";
import { indexes } from "./indexes";

export default function BrainEditor(props) {
  useEffect(() => {
    const loadBrainData = async () => {
      const resp = await axios.get(SERVER_URL + "/brain", {
        params: {
          id: props.selectedBrain,
        },
      });

      console.log("loaded brain data: ", resp.data);
    };

    if (!props.selectedBrain) {
      props.setMenu(indexes.brainViewer);
    } else {
      loadBrainData();
    }
  }, []);

  const deleteBrain = async () => {
    const resp = await axios.delete(SERVER_URL + "/brain", {
      params: {
        username: props.account.username,

        id: props.selectedBrain,
      },
    });

    console.log(resp.data);
    props.setBrains(resp.data);
    props.setMenu(indexes.brainViewer);
  };

  return (
    <div>
      BrainEditor
      <br />
      <button onClick={deleteBrain}>Delete</button>
    </div>
  );
}
