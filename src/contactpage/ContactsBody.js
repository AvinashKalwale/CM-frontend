import React from "react";
import "../App.css";
// import ReactTooltip from 'react-tooltip'; VscTrash
import HoverOver from "../components/HoverOver";
import { GrEdit } from "react-icons/gr";
import { VscTrash } from "react-icons/vsc";

const ContactsBody = ({
  setSearchedEmails,
  page,
  currentpage,
  setfilewithoutnpm,
  setDeleteTracking,
  showDeleteUI,
  showImportUI,
  filewithoutnpm,
  header,
  changeCheckbox,
  deleteTracking,
  searchedEmails,
}) => {
  function deletebyicon(e) {
    let tobedeletedIndex = parseInt(e?.target?.dataset?.svgindex);
    let idsArray = [deleteTracking[tobedeletedIndex]?.id];
    (async function deleteData() {
        tobedeletedIndex = parseInt(e.target?.dataset?.svgindex);
        await fetch("https://contactmangerbackend.herokuapp.com/contacts", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(idsArray),
        })
          .then((x) => x.json())
          .then((removed) => {
            let updatedAfterDelete = [...filewithoutnpm?.datas];
            updatedAfterDelete = updatedAfterDelete.filter((ele, i) => {
              let value=0;
              if (tobedeletedIndex !== i) {
                value=1;
              }
              return value;
            });
            setfilewithoutnpm({ datas: updatedAfterDelete });
            let updatedDeletedtrackingIds = [...deleteTracking];
            updatedDeletedtrackingIds = updatedDeletedtrackingIds.filter(
              (ele, i) => {
                let value=0
                if (tobedeletedIndex !== i) {
                  value=1
                }
                return value;
              }
            );
            setDeleteTracking(() => [...updatedDeletedtrackingIds]);
            // setContactDeleted(true)
            // } )
          });
      }
    )();
  }

  function deletebyiconbysearch(e){
    
    let deleteid=searchedEmails?.datas[0]?._id
    let idsArray = [deleteid];
    (async function deleteData() {
      await fetch("https://contactmangerbackend.herokuapp.com/contacts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(idsArray),
      })
        .then((x) => x.json())
        .then((removed) => {
          let updatedAfterDelete = [...filewithoutnpm?.datas];
          updatedAfterDelete = updatedAfterDelete.filter((ele, i) => {
            let value=0;
            if (ele._id !== deleteid) {
              value=1;
            }
            return value;
          });
          setfilewithoutnpm({ datas: updatedAfterDelete });
          let updatedDeletedtrackingIds = [...deleteTracking];
          updatedDeletedtrackingIds = updatedDeletedtrackingIds.filter(
            (ele, i) => {
              let value=0
              if (ele._id !== deleteid) {
                value=1
              }
              return value;
            }
          );
          setDeleteTracking(() => [...updatedDeletedtrackingIds]);
          setSearchedEmails(()=>{})
        });
    }
  )();


  }
  return (
    <>
      {!searchedEmails?.datas?.length &&
        header?.heading &&
        filewithoutnpm?.datas
          ?.slice(currentpage * 9 - 9, currentpage * 9)
          .map((x, i) => {
            // deletedArray?.push({id:x._id,checked:false})
            // setDeleteTracking((pre)=>[...pre,{id:x._id,checked:false}]) //here not working ;;err: too many renders
            return (
              <div className="data-wrapper" key={i}>
                <div
                  className={
                    showImportUI || showDeleteUI
                      ? "input-header"
                      : "input-header"
                  }
                >
                  <input
                    data-index={String(currentpage * 9 - 9 + i)}
                    onChange={(e) => changeCheckbox(e)}
                    id={x._id}
                    type={"checkbox"}
                    // style={{backgroundColor:"red"}}
                    className={
                      showImportUI || showDeleteUI ? "checkbox-background" : ""
                    }
                    // checked={deleteTracking[i]?.checked}
                    checked={deleteTracking[currentpage * 9 - 9 + i]?.checked}
                  />
                </div>
                <div className="content-overall-wrapper ">
                  <div className="Name common-header-styles remove-border glossy-background">
                    {x.Name}
                  </div>
                  <div className="Designation  common-header-styles remove-border glossy-background">
                    {x.Designation}
                  </div>
                  <div className="Company  common-header-styles remove-border glossy-background">
                    {x.Company}
                  </div>
                  <div className="Industry  common-header-styles remove-border glossy-background">
                    {x.Industry}
                  </div>
                  <HoverOver Email={x.Email} Phonenumber={x.Phonenumber} />
                  {/* <ReactTooltip  place='bottom' id='tool'/> */}
                  {/* <div className="Email  common-header-styles remove-border glossy-background tip" 
              onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} data-for='tool' data-tip={x.Email}
              >{x.Email}</div> */}
                  {/* <div className={isHovering?'blue Phonenumber  common-header-styles remove-border glossy-background':"Phonenumber  common-header-styles remove-border glossy-background"}>{x.Phonenumber}</div> */}
                  <div className="Country  common-header-styles remove-border glossy-background">
                    {x.Country}
                  </div>
                </div>
                <div className="action-wrapper">
                  <div className="Action content-action">
                    <GrEdit />
                    <div onClick={(e) => deletebyicon(e)}>
                      <VscTrash data-svgindex={currentpage * 9 - 9 + i} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

      {searchedEmails?.datas?.length &&
        header?.heading &&
        searchedEmails?.datas?.map((x, i) => {
          return (
            <div className="data-wrapper" key={i}>
              <div className="input-header">
                <input
                  data-index={String(i)}
                  onChange={(e) => changeCheckbox(e)}
                  data-searchdelid={searchedEmails?.datas[0]?._id}
                  type={"checkbox"}
                  // checked={deleteTracking[i]?.checked}
                />
              </div>

            
              {/* 
              let deleteid=searchedEmails?.datas[0]?._id
    let idsArray = [deleteid];
              
              data-index={String(currentpage * 9 - 9 + i)}
                    onChange={(e) => changeCheckbox(e)}
                    id={x._id}
                    type={"checkbox"}
                    // style={{backgroundColor:"red"}}
                    className={
                      showImportUI || showDeleteUI ? "checkbox-background" : ""
                    }
                    // checked={deleteTracking[i]?.checked}
                    checked={deleteTracking[currentpage * 9 - 9 + i]?.checked} */}
          
              <div className="content-overall-wrapper ">
                <div className="Name common-header-styles remove-border">
                  {x.Name}
                </div>
                <div className="Designation  common-header-styles remove-border">
                  {x.Designation}
                </div>
                <div className="Company  common-header-styles remove-border">
                  {x.Company}
                </div>
                <div className="Industry  common-header-styles remove-border">
                  {x.Industry}
                </div>
                <div className="Email  common-header-styles remove-border">
                  {x.Email}
                </div>
                <div className="Phonenumber  common-header-styles remove-border">
                  {x.Phonenumber}
                </div>
                <div className="Country  common-header-styles remove-border">
                  {x.Country}
                </div>
              </div>
              {/* <div className="action-wrapper-body"> */}
              {/* <div  className="Action content-action"> */}
              {/* <GrEdit/> */}
              {/* <div  className="t" onClick={()=>deletebyicon()}> */}
              {/* <VscTrash  /> */}
              {/* </div> */}
              {/* </div> */}
              {/* </div> */}
              <div className="action-wrapper">
                <div className="Action content-action">
                  <GrEdit />
                  <div onClick={(e) => deletebyiconbysearch(e)}>
                    <VscTrash />
                  </div>

                  {/* <div onClick={(e)=>deletebyicon(e)}><VscTrash  data-svgindex={i}/></div> */}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default ContactsBody;
