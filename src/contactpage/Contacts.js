import React, { useEffect, useState ,useRef} from "react";
import ContactsBodyHead from "./ContactsBodyHead";
import ContactsBody from "./ContactsBody";
import Delete from "../delete/Delete";
import Button from "../components/Button";
import Searchbar from "./Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid
} from "@fortawesome/fontawesome-svg-core/import.macro";
import "../App.css";
import { AuthConsumer } from "../useauth/Useauth";
import {
  MdOutlineDashboard,
  MdOutlineContacts,
  MdOutlineImportExport,
  MdDeleteOutline,
} from "react-icons/md";
import { BiFilter, BiExport, BiCalendar } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const Contacts = ({
  showImportUI,
  showDeleteUI,
  setshowDeleteUI,
  updateshowImportUI,
  showUIref_btn,
  filewithoutnpm,
  header,
  changeCheckbox,
  deleteTracking,
  setfilewithoutnpm,
  setheader,
  setDeleteTracking,
  logoutfunction,
}) => {
  const [searchedEmails, setSearchedEmails] = useState({});
  const [page, setPage] = useState({});
  const [currentpage, setCurrentpage] = useState(1);
  const value = AuthConsumer();
  let user = value?.username?.split("@")[0].split("");
  let firstletter = user[0]?.toUpperCase();
  let remaining = user?.slice(1).join("");
  user = firstletter + remaining;
  const showDeleteref_btn = useRef(null);


  useEffect(() => {
   
    if (filewithoutnpm?.datas) {
      let filearray = [...filewithoutnpm?.datas];
      if (filearray?.length > 9) {
        let additional = parseInt(filearray?.length / 9);
        if (filearray.length % 9 !== 0) {
          additional = additional + 1;
        }
        let pageArray = [];
        for (let i = 1; i <= additional; i++) {
          pageArray.push(i);
        }
        setPage(() => {
          return {
            pages: pageArray,
          };
        });
      } else {
        setPage(() => {
          return {
            pages: [1],
          };
        });
      }
    }
    let checkslice = filewithoutnpm?.datas?.slice(
      currentpage * 9 - 9,
      currentpage * 9
    );
    if (checkslice?.length === 0 && currentpage !== 1) {
      setCurrentpage((prev) => prev - 1);
    }
  }, [filewithoutnpm,currentpage]);
  function changepages(e) {
    let pagenumber = e.target.id;
    setCurrentpage(() =>parseInt(pagenumber));
  }
  function updateshowDeleteUI() {
    setshowDeleteUI((prev) => !prev);
  }

  return (
    <>
      <div className="Contact-page-wrapper">
        <div className={showImportUI || showDeleteUI?`aside-wrapper common-opacity`:"aside-wrapper"}>
          <div className="aside-logo-container">
            <div className="logo-container">
              <div className="main-logo">
                <p className="logo-main-text">Logo</p>
              </div>
            </div>
            <div className="aside-contact-header">
              <div className="child-aside">
                <MdOutlineDashboard className="dash" />
                <p className="dashboard-text">Dashboard</p>
              </div>
              <div className="child-aside child-total-contacts">
               
                <MdOutlineContacts className="total-contacts" />
                <div className="dash-text-border">
                  <div className="dash-text dash-text-total ">
                    Total contacts
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="aside-logout-container">
            <div className={"logo-content-wrapper"}>
              <FontAwesomeIcon icon={solid("right-from-bracket")} />
              <button
                className={
                  showImportUI || showDeleteUI
                    ? "btn-before-glossy glossy-background logout-bottom"
                    : "btn-before-glossy logout-bottom"
                }
                onClick={() => logoutfunction()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="main-page-wrapper">
          <div className="header-wrapper">
            <div className="header">
              <p className="para-total-contact" >Total contacts</p>
            </div>
            <div className="search-wrapper">
              <div className="search-bar-wrapper">
                <div className="search-bar">
                  <Searchbar
                    showDeleteUI={showDeleteUI}
                    showImportUI={showImportUI}
                    setSearchedEmails={setSearchedEmails}
                    searchedEmails={searchedEmails}
                    filewithoutnpm={filewithoutnpm}
                  />
                </div>
              </div>
              <div className="usersdetails-container">
                <div className="logo-data-wrapper">
                  <div className="user-logo-container">
                    <img
                      alt="user"
                      className={
                        showImportUI || showDeleteUI ? "glossy-image" : ""
                      }
                      src={"user.png"}
                    />
                  </div>
                  <div className="data-container">
                    <div className="username-text">{user}</div>
                    <div className="userrole-text">Engineer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-wrapper">
            <div className="main-body-content-wrapper">
              <div className="header-btn-wrapper">
                <div className="filtered-container">
                  <div className={showImportUI || showDeleteUI?`date-container common-opacity`:"date-container"}>
                    
                    <BiCalendar className="react-icon-common react-icons-left" />

                    <Button
                      classname={
                        showImportUI || showDeleteUI
                          ? "common-styles-btn dates-filter btn-before-glossy glossy-background common-opacity-text-color-btns"
                          : "common-styles-btn dates-filter common-opacity-text-color-btns"
                      }
                      value={"Select Date"}
                    />
                    <FiChevronDown className="react-icon-common arrow-down-icon" />
                  </div>
                  <div  className={showImportUI || showDeleteUI?`filter-details-wrapper common-opacity`:"filter-details-wrapper"}>
                
                    <BiFilter className="react-icon-common filter-icon react-icons-left" />

                    <Button
                      classname={
                        showImportUI || showDeleteUI
                          ? "common-styles-btn dates-filter btn-before-glossy glossy-background common-opacity-text-color-btns"
                          : "common-styles-btn dates-filter common-opacity-text-color-btns"
                      }
                      value={"Filters   |"}
                    />
                   
                    <FiChevronDown className="react-icon-common arrow-down-icon" />
                  </div>
                </div>
                <div className="import-export-container">
                
                  <div className={showImportUI || showDeleteUI?`common-btn-container common-opacity`:"common-btn-container"}>
                   
                    <MdDeleteOutline className="react-icon-common react-icons-right delete" />
                    <Button
                        showUI={showDeleteUI}
                        classname={
                          showImportUI || showDeleteUI
                            ? "common-styles-btn btn-before-glossy glossy-background common-opacity-text-color-btns"
                            : "common-styles-btn common-opacity-text-color-btns"
                        }
                        showref={showDeleteref_btn}
                        functionality={updateshowDeleteUI}
                        value={"Delete"}
                      />
                  </div>
                  {showDeleteUI &&(<Delete
                      setSearchedEmails={setSearchedEmails}
                      searchedEmails={searchedEmails}
                      showDeleteUI={showDeleteUI}
                      setshowDeleteUI={setshowDeleteUI}
                      showDeleteref_btn={showDeleteref_btn}
                      setheader={setheader}
                      setDeleteTracking={setDeleteTracking}
                      deleteTracking={deleteTracking}
                      filewithoutnpm={filewithoutnpm}
                      setfilewithoutnpm={setfilewithoutnpm}
                    />)}

                  <div className={showImportUI || showDeleteUI?`common-btn-container common-opacity`:"common-btn-container"}>
                    
                    <MdOutlineImportExport className="react-icon-common react-icons-right delete" />
                    <Button
                      classname={
                        showImportUI || showDeleteUI
                          ? "common-styles-btn import-btn btn-before-glossy glossy-background common-opacity-text-color-btns"
                          : "common-styles-btn import-btn common-opacity-text-color-btns"
                      }
                      showUI={showImportUI}
                      showref={showUIref_btn}
                      functionality={updateshowImportUI}
                      value={"Import"}
                    />
                  </div>

                  <div className={showImportUI || showDeleteUI?`common-btn-container common-opacity`:"common-btn-container"}>
                    
                    <BiExport className="react-icon-common react-icons-right delete" />

                    <Button
                      classname={
                        showImportUI || showDeleteUI
                          ? "common-styles-btn btn-before-glossy glossy-background common-opacity-text-color-btns"
                          : "common-styles-btn common-opacity-text-color-btns"
                      }
                      value={"Export"}
                    />
                  </div>
                </div>
              </div>
              <div className="contacts-wrapper">
              
                {filewithoutnpm?.datas?.length!==0 &&(
                       <ContactsBodyHead
                       showDeleteUI={showDeleteUI}
                       showImportUI={showImportUI}
                       changeCheckbox={changeCheckbox}
                       filewithoutnpm={filewithoutnpm}
                       header={header}
                     />   
                )
                }
                <ContactsBody
                        setSearchedEmails={setSearchedEmails}
                        page={page}
                        currentpage={currentpage}
                        setfilewithoutnpm={setfilewithoutnpm}
                        setDeleteTracking={setDeleteTracking}
                        showDeleteUI={showDeleteUI}
                        showImportUI={showImportUI}
                        searchedEmails={searchedEmails}
                        deleteTracking={deleteTracking}
                        changeCheckbox={changeCheckbox}
                        filewithoutnpm={filewithoutnpm}
                        header={header}
                      />
              
              </div>
            </div>
          </div>
          <div className={showImportUI || showDeleteUI?`pagination common-opacity opacity-pagination`:"pagination"}>
            <div className="pagination-content-wrapper">
              <IoIosArrowBack className="pagination-arrow" />
              {page?.pages?.length <= 4 &&
                page?.pages?.map((x, i) => (
                  <div
                    id={x}
                    onClick={(e) => changepages(e)}
                    className={currentpage===x?"page-number currentpage":"page-number non-currentpage"}
                    key={i}
                  >
                    {x}
                  </div>
                ))}
              {page?.pages?.length > 4 &&
                page?.pages?.slice(0, 4).map((x, i) => (
                  <div
                    id={x}
                    onClick={(e) => changepages(e)}
                    className="page-number"
                    key={i}
                  >
                    {x}
                  </div>
                ))}
              {page?.pages?.length > 4 && <div>...</div>}
              <IoIosArrowForward className="pagination-arrow"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
