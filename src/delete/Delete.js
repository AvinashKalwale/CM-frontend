import { useState, useRef, useEffect } from "react";
import "../App.css";
import Button from "../components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
function Appdelete({
  showDeleteUI,
  setshowDeleteUI,
  classname,
  deleteTracking,
  setheader,
  setDeleteTracking,
  setfilewithoutnpm,
  filewithoutnpm,
  searchedEmails,
  setSearchedEmails,
}) {
  const showDeleteref_btn = useRef(null);
  const showDeleteref_content = useRef(null);
  const [contactDeleted, setContactDeleted] = useState(false);
  function updateshowDeleteUI() {
    setshowDeleteUI((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDeleteref_btn.current &&
        !showDeleteref_btn.current.contains(event.target) &&
        showDeleteref_content.current &&
        !showDeleteref_content.current.contains(event.target)
      ) {
        setshowDeleteUI(false);
      }
    };
    if(!showDeleteUI){
      document.addEventListener("click", handleClickOutside, false);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [setshowDeleteUI,showDeleteUI]);
  useEffect(() => {
    // imp for claer
    if (contactDeleted) {
      setTimeout(() => {
        setshowDeleteUI(false);
        setContactDeleted(false);
      }, 1000);
    }
  }, [contactDeleted,setshowDeleteUI]);

  function deleteFiles() {
    let idsArray = [];
    deleteTracking.forEach((ele) => {
      if (ele.checked) {
        idsArray.push(ele.id);
        // let currentid=ele.id
        // setIdObj((prev)=>{
        //   return ({
        //     ...prev,
        //     currentid
        //   })
        // })
      }
    });

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
          // updatedAfterDelete.filter((e)=>{

          // })
          let hashmap = new Map();
          deleteTracking.forEach((ele) => {
            if (ele.checked) {
              hashmap.set(ele.id, ele.id);
            }
          });
          let updatedAfterDelete = [...filewithoutnpm?.datas];
          updatedAfterDelete = updatedAfterDelete.filter((ele) => {        
            let value=0    
            if (!hashmap.has(ele._id)) {
              value=1
            }
            return value;
          });

          // setshowDeleteUI(false)
          setfilewithoutnpm({ datas: updatedAfterDelete });

          let updatedDeletedtrackingIds = [...deleteTracking];
          updatedDeletedtrackingIds = updatedDeletedtrackingIds.filter(
            (ele) => {
              let value=0
              if (!hashmap.has(ele.id)) {
                value=1
              }
              return value;
            }
          );
          setDeleteTracking(() => [...updatedDeletedtrackingIds]);
          setContactDeleted(true);
          setSearchedEmails(() => {});
        });
    })();
  }
  function cancelDelete() {
    setshowDeleteUI(false);
  }

  return (
    <>
      {showDeleteUI && (
        <style>{"body {background-color:rgba(0, 0, 0, 0.5)}"}</style>
      )}
      <Button
        classname={classname}
        showUI={showDeleteUI}
        showref={showDeleteref_btn}
        functionality={updateshowDeleteUI}
        value={"Delete"}
      />
      <div className="import">
        {showDeleteUI && (
          <div ref={showDeleteref_content}>
            <div className="drag-wrapper-delete">
              {!contactDeleted && (
                <>
                  <div className="del-logo-wrapper">
                    <div className="del-logo">
                      <FontAwesomeIcon
                        className="fontaw-tick"
                        icon={solid("trash-can")}
                      />
                    </div>
                  </div>
                  <div className="delete-text-wrapper">
                    <p className="del-text">Delete Contacts</p>
                  </div>
                  <div className="delete-confirm-wrapper">
                    <p className="del-confirm-text">
                      Sure you want delete this Contacts ?
                    </p>
                  </div>
                  <div className="btn-wrapper">
                    <button className="cancel-btn" onClick={cancelDelete}>
                      Cancel
                    </button>
                    <button className="delete-ok-btn" onClick={deleteFiles}>
                      Ok
                    </button>
                  </div>
                </>
              )}
              {contactDeleted && (
                <>
                  <div className="del-logo-wrapper del-tick-wrapper">
                    <div className="del-logo">
                      <FontAwesomeIcon
                        className="fontaw-tick"
                        icon={solid("check")}
                      />
                    </div>
                  </div>
                  <div className="deleted-message">
                    <p>Deleted Contacts</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Appdelete;
