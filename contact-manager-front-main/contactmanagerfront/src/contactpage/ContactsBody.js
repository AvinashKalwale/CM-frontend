import React from "react";
import "../App.css";
import HoverOver from "../components/HoverOver";
import { VscTrash } from "react-icons/vsc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro"; 

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
            return (
              <div className={(i%2!==0)?"data-wrapper hover-over-content common-inside-text-color alternate-color":"data-wrapper hover-over-content common-inside-text-color"} key={i}>
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
                    className={
                      showImportUI || showDeleteUI ? "checkbox-background" : ""
                    }
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
                  
                  <div className="Country  common-header-styles remove-border glossy-background">
                    {x.Country}
                  </div>
                </div>
                <div className="action-wrapper">
                  <div className="Action content-action delete-icon">
                    <div className="edit-icon">
                    <FontAwesomeIcon
              style={{ color: "rgb(0,181,226)" }}
                  icon={solid ("pencil")}
                />
                    </div>
        
                    <div className="delete-red-icon"  onClick={(e) => deletebyicon(e)}>
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
            <div className="data-wrapper  common-inside-text-color" key={i}>
              <div className="input-header">
                <input
                  data-index={String(i)}
                  onChange={(e) => changeCheckbox(e)}
                  data-searchdelid={searchedEmails?.datas[0]?._id}
                  type={"checkbox"}
                />
              </div>

          
              <div className="content-overall-wrapper ">
                <div className="Name common-header-styles glossy-background remove-border">
                  {x.Name}
                </div>
                <div className="Designation  common-header-styles glossy-background remove-border">
                  {x.Designation}
                </div>
                <div className="Company  common-header-styles glossy-background remove-border">
                  {x.Company}
                </div>
                <div className="Industry  common-header-styles glossy-background remove-border">
                  {x.Industry}
                </div>
                <div className="Email  common-header-styles glossy-background remove-border">
                  {x.Email}
                </div>
                <div className="Phonenumber  common-header-styles  glossy-background remove-border">
                  {x.Phonenumber}
                </div>
                <div className="Country  common-header-styles  glossy-background remove-border">
                  {x.Country}
                </div>
              </div>
            


             
              <div className="action-wrapper">
                <div className="Action content-action  delete-icon">
                <FontAwesomeIcon
              style={{ color: "rgb(0,181,226)" }}
                  icon={solid ("pencil")}
                />
                  <div className="delete-red-icon"  onClick={(e) => deletebyiconbysearch(e)}>
                    <VscTrash />
                  </div>

                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default ContactsBody;
