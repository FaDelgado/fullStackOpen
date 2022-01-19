const Notification = ({ objMessage }) => {
  if (!objMessage.message) {
    return null;
  }

  if (objMessage.type === "error") {
    return <div className="error">{objMessage.message}</div>;
  }
  if (objMessage.type === "success") {
    return <div className="success">{objMessage.message}</div>;
  }
  if (objMessage.type === "updated") {
    return <div className="updated">{objMessage.message}</div>;
  }
  return null;
};

export default Notification;
