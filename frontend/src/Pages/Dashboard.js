import React from "react";
import Chart from "../Components/Dashboard/Chart"
import { Link } from "react-router-dom";

import ShortcutChat from "../Components/Dashboard/ShortcutChat";
import ShortcutDriverlocation from "../Components/Dashboard/ShortcutDriverlocation.js";
import ShortcutLog from "../Components/Dashboard/ShortcutLog";
import ShortcutUser from "../Components/Dashboard/ShortcutUser";

import "./css/Dashboard.css"
const Dashboard = () => {
  return (
    <div>
      <Chart />
      <div className="shorcut-block">
      <Link
        className="shortcut-link"
        to="driverlocation">
        <ShortcutDriverlocation />
      </Link>
      <Link
        className="shortcut-link"
        to="chat">
        <ShortcutChat />
      </Link>
      </div>
      <div className="shorcut-block">
      <Link
        className="shortcut-link"
        to="log">
        <ShortcutLog />
      </Link>
      <Link
        className="shortcut-link"
        to="user">
        <ShortcutUser />
      </Link>
      </div>
    </div>
  );
};
export default Dashboard;