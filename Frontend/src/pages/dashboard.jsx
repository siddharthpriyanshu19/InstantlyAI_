import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const [stats] = useState({
    leads: 0,
    emailsSent: 0,
    replies: 0
  });

  return (

    <div style={{padding:40,fontFamily:"Arial"}}>

      <h1>InstantlyAI Dashboard</h1>

      <div style={{marginTop:30}}>

        <h3>Total Leads: {stats.leads}</h3>
        <h3>Emails Sent: {stats.emailsSent}</h3>
        <h3>Replies: {stats.replies}</h3>

      </div>

      <div style={{marginTop:40}}>

        <Link to="/upload">
          <button>Upload Leads</button>
        </Link>

        <br/><br/>

        <Link to="/campaign">
          <button>Create Campaign</button>
        </Link>

      </div>

    </div>

  );

}