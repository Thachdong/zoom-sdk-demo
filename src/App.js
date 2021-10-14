import React, {useState} from 'react'

import "./index.css";
import Zoom from "./Zoom";

export default function App() {
  const [joinMeeting, setJoinMeeting] = useState(false);

  if (joinMeeting) return <Zoom />

  return (
    <div className="app">
      <button className="join-btn" onClick={() => setJoinMeeting(true)}>
        Join meeting
      </button>
    </div>
  )
}
