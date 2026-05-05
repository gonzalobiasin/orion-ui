import { useState } from "react";
import "./App.css";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Dashboard from "./components/Dashboard";
import TradeForm from "./components/TradeForm";
import TradeList from "./components/TradeList";

const API = "https://orion-backend-8nbf.onrender.com";

export default function App(){
  const [userId,setUserId]=useState(null);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [trades,setTrades]=useState([]);
  const [open,setOpen]=useState(false);

  const login=async()=>{
    const r=await fetch(API+"/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
    const d=await r.json();
    if(d.user_id){ setUserId(d.user_id); load(d.user_id); }
  };

  const load=async(uid)=>{
    const r=await fetch(API+"/trades/"+uid);
    const d=await r.json();
    setTrades(d||[]);
  };

  if(!userId){
    return(
      <div className="login">
        <h1>Orion Journal 🚀</h1>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={login}>Entrar</button>
      </div>
    );
  }

  return(
    <div className="layout">
      <Sidebar/>
      <div className="main">
        <Header onOpen={()=>setOpen(true)}/>
        <Dashboard trades={trades}/>
        <TradeList trades={trades} onReload={()=>load(userId)}/>
        <TradeForm open={open} onClose={()=>setOpen(false)} userId={userId} onDone={()=>load(userId)}/>
      </div>
    </div>
  );
}