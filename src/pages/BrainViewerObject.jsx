export default function (props) {
  return (
    <div>
      <button onClick={() => props.selectBrain(props.id)}>
        Brain {props.id}
      </button>
    </div>
  );
}
