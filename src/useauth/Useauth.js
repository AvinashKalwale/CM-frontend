import React, { useState } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [accesstoken, setaccesstoken] = useState("");
  const [username, setusername] = useState("");
  const [userid, setuserid] = useState("");
  const value = {
    accesstoken: accesstoken,
    setValue: (value) => setaccesstoken(() => value),
    username: username,
    setName: (val) => setusername(() => val),
    userid: userid,
    setId: (id) => setuserid(() => id),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthConsumer() {
  return React.useContext(AuthContext);
}
