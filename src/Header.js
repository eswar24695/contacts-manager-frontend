import axios from "axios";
import React, { useContext} from "react"
import Search from "./Images/search.png"
import User from "./Images/user.png"
import Importbutton from "./components/navbar";
import "./Header.css";
import Side from "./sidebar";
import Table from "./table";
import { Context } from "../src/components/axios/axioscontext";
const Header=()=>{
    // search bar
    const { email, myFunction } = useContext(Context);
    const user = localStorage.getItem("email").split("@")[0].toUpperCase()
   return(
    <>
     <Side/>
    <nav className="header">
        <section className="title">
            <h1 className="b"> Total Contacts </h1>
        </section>
        <section className="search_bar">
            <img src={Search} alt="search_bar"></img>
           <input type="search"  placeholder="search by Email Id...." id='myInput' onKeyUp={() => myFunction()} ></input>
        </section>
        <section className='user-container'>
            <div className='user-image'>
               <img src={User} alt="user" />
            </div>
             <div className='user-details'>
             <p style={{ fontSize: "20px", color: "#0a89e4f0" }}>
                   {user}
             </p>
            <p className='user-type'>
                  Super Admin
             </p>
           </div>
        </section>

        <Table/>
    </nav>
    <Importbutton/>
    
     </>
   
)
}
export default Header;