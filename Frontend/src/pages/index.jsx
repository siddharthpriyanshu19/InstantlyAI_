import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, []);

  return (
    <div style={{padding:40}}>
      <h2>Loading...</h2>
    </div>
  );
}