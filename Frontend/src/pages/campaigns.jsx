import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Campaign() {

  const [campaign,setCampaign] = useState({
    seller_company_description:"",
    product_description:"",
    seller_website:""
  });

  const [loading,setLoading] = useState(false);

  const startCampaign = async () => {

    if(
      !campaign.seller_company_description ||
      !campaign.product_description ||
      !campaign.seller_website
    ){
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try{

      const res = axios.post("http://localhost:5000/emails/send", {
  campaign
})

      console.log(res.data);

      alert("Campaign started");

    }catch(err){

      console.error(err);
      alert("Campaign failed");

    }

    setLoading(false);

  };

  return (

    <div style={{padding:40,fontFamily:"Arial"}}>

      <h1>Create Campaign</h1>

      <input
        placeholder="Seller Company Description"
        style={{width:400}}
        onChange={(e)=>
          setCampaign({
            ...campaign,
            seller_company_description:e.target.value
          })
        }
      />

      <br/><br/>

      <input
        placeholder="Product Description"
        style={{width:400}}
        onChange={(e)=>
          setCampaign({
            ...campaign,
            product_description:e.target.value
          })
        }
      />

      <br/><br/>

      <input
        placeholder="Seller Website"
        style={{width:400}}
        onChange={(e)=>
          setCampaign({
            ...campaign,
            seller_website:e.target.value
          })
        }
      />

      <br/><br/>

      <button onClick={startCampaign}>
        {loading ? "Starting..." : "Start Campaign"}
      </button>

      <br/><br/>

      <Link to="/dashboard">Back</Link>

    </div>

  );

}