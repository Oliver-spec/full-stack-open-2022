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
  } else if (notificationState.includes("Invalid")) {
    return <div style={ErrorStyle}>Invalid Name or Phone Number</div>;
  } else if (notificationState.startsWith("Error: Name already exists!")) {
    return <div style={ErrorStyle}>{notificationState}</div>;
  } else if (
    notificationState.startsWith("Error: Cannot find the specified person!")
  ) {
    return <div style={ErrorStyle}>{notificationState}</div>;
  } else {
    return <div style={NormalStyle}>{notificationState}</div>;
  }
}
