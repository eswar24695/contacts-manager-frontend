import { createContext, useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios"
export const Context = createContext()
export const  Provider = (props) => {
  const [contacts, setContacts] = useState([])
  const [deletearr,setdeletearr]=useState([]);
  const [email, setEmail] = useState("");
  const [token,setToken]=useState("")
  const nav = useNavigate();
  // console.log(deletearr)
  // const userSignIn = (loginData) => {
  //   axios
  //     .post("http://localhost:8000/login", loginData)
  //     .then((res) => {
  //       console.log(res.data);
  //       const token = res.data.token;
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("email", loginData.email);
  //       nav("/contacts");
  //       window.alert("Login Successful");
  //       document.location.reload();
  //       setEmail(loginData.email);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data.message);
  //       window.alert(err.response.data.message);
  //       console.log(err);
  //     });
  // };

  // const userSignUp = (userData) => {
  //   try {
  //     axios
  //       .post("http://localhost:8000/signUp", userData)
  //       .then((res) => {
  //         nav("/");
  //         window.alert("Registration Successful");
  //       })
  //       .catch((err) => window.alert(err.response.data.error));
  //   } catch (e) {
  //     window.alert(e.message);
  //   }
  // };
  const userSignIn = (loginData) => {
    axios
      .post("https://cm-backend-qepk.onrender.com/login", loginData)
      .then((res) => {
        setToken(res.data.token)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", loginData.email);
        nav("/contacts");
        window.alert("Login Successful");
        document.location.reload();
        setEmail(loginData.email);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        window.alert(err.response.data.message);
        console.log(err);
      });
  };

  const userSignUp = (userData) => {
    try {
      axios
        .post("https://cm-backend-qepk.onrender.com/register", userData)
        .then((res) => {
          nav("/");
          window.alert("Registration Successful");
        })
        .catch((err) => window.alert(err.response.data.error));
    } catch (e) {
      window.alert(e.message);
    }
  };
 
  const config = {
    headers: {
      token:localStorage.getItem("token")
    },
  };
  //import contacts
  const postcontacts = async (contactdata) => {
    //console.log("Data-",contactdata)
    return await axios
      .post("https://cm-backend-qepk.onrender.com/api/v1/contacts",contactdata,config)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.data.message)
        // console.log(err)
      })
  }
  //getting contacts
  const fetchContacts = () => {
    axios
      .get("https://cm-backend-qepk.onrender.com/api/v1/contacts",config)
      .then((res) => {
        //console.log(res.data.users);
      //   const data = res.data.message[0].Contacts;
      //  const data = res.data[0].contact;
      console.log(res.data.users);
        setContacts(res.data.users);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchContacts();
  },[]);
  //delete contacts------------------------------------------------

  const deletecontacts=(id)=>{
    axios
      .delete(`https://cm-backend-qepk.onrender.com/api/v1/contacts/${id}`,config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
  }
  const myFunction = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  return (
    <Context.Provider value={{ postcontacts, setContacts, contacts,deletecontacts,fetchContacts,setdeletearr,deletearr,userSignIn,
      email,userSignUp,myFunction,token}}>
      {props.children}

    </Context.Provider>

  )

}