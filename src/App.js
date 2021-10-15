import React, { useState } from "react";

import "./index.css";
import Zoom from "./Zoom";

export default function App() {
  const [joinMeeting, setJoinMeeting] = useState(false);
  const [meetingNumber, setMeetingNumber] = useState();

  if (joinMeeting) {
    return <Zoom meetingNumber={meetingNumber} />;
  }

  function handleJoinMeeting() {
    if (!meetingNumber) {
      alert("Enter Meeting Number before join meeting !");
      return;
    }
    setJoinMeeting(true);
  }

  return (
    <div className="app">
      <div>
        <div>
          <input
            type="number"
            className="meeting-number"
            placeholder="Enter Meeting Number"
            value={meetingNumber}
            onChange={(e) => setMeetingNumber(e.target.value)}
          />
        </div>

        <button className="join-btn" onClick={handleJoinMeeting}>
          Join Meeting
        </button>
      </div>
    </div>
  );
}
