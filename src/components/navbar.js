import { useContext, useState } from "react";
import { parse } from "papaparse";
import { Context } from "./axios/axioscontext";
import Calendar from "../Images/calender.png"
import downArrow from "../Images/downArrow.png"
import filter from "../Images/list.png"
import verticleLine from "../Images/verticleLine.png"
import Export from "../Images/export.png"
import Import from "../Images/sort.png"
//import importComplete from "../public/importComplete.png"
import "../import.css"
const Importbutton = () => {
    const { postcontacts, setContacts, deletearr, deletecontacts, fetchContacts } = useContext(Context)
    const [button, setbutton] = useState(false)
    const [deletebutton, setdeletebutton] = useState(false);
    const [popdel, setpopdel] = useState(true)
    const [popimport, setPopimport] = useState(true)
    // console.log(deletearr)
    const handledrag = (e) => {
        e.preventDefault()
    }
    const handledrop = (e) => {
        e.preventDefault()
        
        const convertarr = Array.from(e.dataTransfer.files) //converting object to array
        convertarr.map(async file => { //
            //console.log(file) //convertion to object
            let text = await file.text() //convertion to object to csv text
            let result = parse(text, { header: true }) //converting csvtext to json object // header is for field headings
            //document.location.reload()
            console.log(result.data)
            postcontacts(result.data)
            // document.location.reload()

        })
        setPopimport(false)
    }
    let set = new Set()
    const handledelete = (e) => {
        for (let i = 0; i < deletearr.length; i++) {
            if (!set.has(deletearr[i])) set.add(deletearr[i])
            else set.delete(deletearr[i])
        }
        for (let id of set.keys()) {
            deletecontacts(id)
        }
        fetchContacts()
        setpopdel(false)


    }
    const deletefinal = () => {
        setdeletebutton(false);
        document.location.reload()

    }

    return (
        <>
            <div className='left-nav'>
                <div className='nav-items'>
                    <img src={Calendar} alt="" />
                    <span>Select Date</span>
                    <img src={downArrow} alt="" />
                </div>
                <div className='nav-items'>
                    <img src={filter} alt="" />
                    <span>Filter</span>
                    <img src={verticleLine} alt="" />
                    <img src={downArrow} alt="" />
                </div>
            </div>
            <div className="main">
                    <button id="delbutton" onClick={() => { setdeletebutton(true) }}>Delete</button>
                    <button id="importbutton" onClick={() => { setbutton(true) }}>Import</button>

                {button &&
                    <>
                        {(popimport) ? (
                            <div id="page" onDragOver={handledrag} onDrop={handledrop}>
                                <div id="card">
                                    <div id="importimg">
                                        <img src="importLogo.png" alt="PopUp" />
                                    </div>
                                    <div id="import">Import File</div>
                                    <div id="drop">Drag and  Drop a CSV File to Upload</div>
                                    <button id="butmainimp">
                                        <div id="cancel" onClick={() => { setbutton(false) }}>Cancel</div>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div id="page" >
                                <div id="card">
                                    <div id="importcompleteimg"><img src="importComplete.png" alt="PopUp" /></div>
                                    <div id="importcom">Import completed</div>
                                    <div id="dropcom">CSV File is Uploaded</div>
                                    <button id="butmainimp">
                                        <div id="cancel" onClick={() => { setbutton(false); document.location.reload() }}>Ok</div>
                                    </button>
                                </div>
                            </div>)}
                    </>
                }
                { /* delete functionality */}
                {deletebutton &&
                    <>
                        {(popdel) ? (
                            <div id="page" >
                                <div id="card">
                                    <div id="importimg">
                                        <img src="impDel.png" alt="PopUp" />
                                    </div>
                                    <div id="del">Delete Contacts</div>
                                    <div id="dropdel">Sure you want to delete this Contacts?</div>
                                    <button id="butmain">
                                        <div id="cancel" onClick={() => { setdeletebutton(false) }}>Cancel</div>
                                    </button>
                                    <button id="ok" onClick={handledelete}>Ok</button>

                                </div>
                            </div>
                        ) : (
                            <div id="page" >
                                <div id="card">
                                    <div id="deliconimg">
                                        <img src="delIconComp.png" alt="PopUp" />
                                    </div>
                                    <div id="delcon">Deleted Contacts</div>
                                    <button id="delbutt">
                                        <div id="delok" onClick={deletefinal}>OK</div>
                                    </button>
                                </div>
                            </div>
                        )

                        }
                    </>
                }

            </div>
            <div className='right-nav'>
                <div className='nav-items'>
                    <img src={Export} alt="" />
                    <span>Export</span>
                </div>
            </div>
        </>

    )

}
export default Importbutton