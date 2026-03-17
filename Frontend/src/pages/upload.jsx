import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Upload() {

  const [file, setFile] = useState(null);
  const [loading,setLoading] = useState(false);

  const uploadCSV = async () => {

    if(!file){
      alert("Select a CSV file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try{

      const res = await axios.post(
        "http://localhost:5000/leads/upload",
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );

      console.log(res.data);

      alert("Leads uploaded successfully");

    }catch(err){

      console.error(err);
      alert("Upload failed");

    }

    setLoading(false);

  };

  return (

    <div style={{padding:40,fontFamily:"Arial"}}>

      <h1>Upload Leads CSV</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <br/><br/>

      <button onClick={uploadCSV}>
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      <br/><br/>

      <Link to="/dashboard">Back to Dashboard</Link>

    </div>

  );

}