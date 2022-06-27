export default function Notification({ notificationState }) {
  const NormalStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const ErrorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (notificationState === null) {
    return null;
  } else if (notificationState.startsWith("information")) {
    return <div style={ErrorStyle}>{notificationState}</div>;
  } else {
    return <div style={NormalStyle}>{notificationState}</div>;
  }
}
