import React, { useContext,useState } from "react";
import { Context } from "./components/axios/axioscontext";
import Tooltip from "rc-tooltip";
import "./table.css"
import "rc-tooltip/assets/bootstrap.css";

const Table = () => {
    const { contacts, fetchContacts,setCheckedArr, deletecontacts, setdeletearr ,myFunction} = useContext(Context)
    //console.log(contacts)
    const tableheader = ["Name", "Designation", "Company", "Industry", "Email", "Phone number", "Country","Action"]
    let dummyarr = []
    const checkedindi = (e) => {
        dummyarr.push(e.target.value)
        // console.log(dummyarr);
        setdeletearr((prev) => {
            return [...prev, ...dummyarr]
        })
    }
    const [pageNo, setPageNo] = useState(1);
    let limit = 8;
    let pages = Math.ceil(contacts.length / limit);
    let pagesArray = new Array(pages).fill(0);
    const start = (pageNo - 1) * limit;
    const end = pageNo * limit;
    const contactperpage = contacts.slice(start, end);
    const left = "<"
    const right = ">"
    const handlepageClick = (e) => {
        console.log((e.target.value));
        setPageNo(parseInt(e.target.value))
    }

    const MyTooltip = ({ content, children }) => (
        <Tooltip
            overlay={content}
            mouseLeaveDelay={0.2}
            mouseEnterDelay={0.1}
            defaultVisible={false}
            placement="bottom"
            overlayClassName="bbs-tooltip"
            overlayInnerStyle={{
                color: "#2DA5FC",
                background: "#FFFFFF",
                width: "223px",
                height: " 33px",
                fontSize: "18px",
                textAlign: "center",
                opacity: "1",
            }}
        >
            {children}
        </Tooltip>
    );

    return (
        <>
            <div className="main2">
                <table id="myTable" className="table table-hover">
                    <thead id="tableHead">
                        <tr>
                            <input type="checkbox" id="checkAll" />
                            {tableheader.map((headervalue, index) => {
                                return <th key={`${index}-index`}>{headervalue}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {contacts.map((doc, index) => {
                            return (

                                <tr key={doc._id}>
                                    <input type="checkbox" id="checksingle"  value={doc._id} onClick={checkedindi} />
                                    <td>{doc.Name}</td>
                                    <td>{doc.Designation}</td>
                                    <td>{doc.Company}</td>
                                    <td>{doc.Industry}</td>
                                    <MyTooltip content={doc.Email}>
                                    <td>{doc.Email}</td>
                                    </MyTooltip>
                                    <td>{doc.PhoneNumber}</td>
                                    <td>{doc.Country}</td>
                                    <td>
                                        <img src="Edit-Pen.png" alt="" />
                                        <img src="Delete-Bin.png" alt="" onClick={() => {
                                            // deleteContacts(item._id);
                                            document.location.reload();
                                        }} />
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>


                </table>

            <div className='page-no'>
                {(pageNo > pages) ? null : <button onClick={() => {
                    if (pageNo > 1) {
                        setPageNo(pageNo - 1)
                    }
                }
                }> {left} </button>}

                {
                    pagesArray.map((item, i) => {
                        return (<button value={i + 1} onClick={handlepageClick}>{i + 1}</button>)
                    })
                }
                {(pageNo > pages) ? null : <button onClick={() => {
                    if (pageNo !== pages) {
                        setPageNo(pageNo + 1)
                    }
                }
                }> {right} </button>}
            </div>
            </div>
        </>

    )

}
export default Table;