import React from "react";
import "../App.css";
import { TiArrowUnsorted } from "react-icons/ti";
const ContactsBodyHead = ({
  showDeleteUI,
  showImportUI,
  filewithoutnpm,
  header,
  changeCheckbox,
}) => {
  return (<>
    <div className={(showImportUI || showDeleteUI)?`data-wrapper body-header common-opacity`:"data-wrapper body-header"}
    style={{backgroundColor:filewithoutnpm?.datas?.length?"#B3DFFF":"#FFFFFF"}}
    >
      {filewithoutnpm?.datas?.length !== 0 && header?.heading && (
        <div className="input-header">
          <input
            name="Deleteall"
            className={
              showImportUI || showDeleteUI ? "checkbox-background" : ""
            }
            onChange={(e) => changeCheckbox(e)}
            type={"checkbox"}
          />
        </div>
      )}
      <div className="content-overall-wrapper common-header-text-color">
        {filewithoutnpm?.datas?.length !== 0 &&
          header?.heading?.map((ele, i) => {
            if (ele !== "Designation" && ele !=="Company" && ele !== "Industry") {
              return (
                <div key={i} className={`${ele} common-header-styles`}>
                  {ele}
                </div>
              );
            } else {
              return (
                <div
                  key={i}
                  className={`${ele} common-header-styles logo-text-wrapper`}
                >
                  <>{ele}</>
                  <div
                    className={
                      ele === "Designation" || ele === "Company"
                        ? "up-down-logo-container desig-company"
                        : "up-down-logo-container"
                    }
                  >
                    <TiArrowUnsorted />
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div className="action-wrapper common-header-text-color">
        {filewithoutnpm?.datas?.length !== 0 && header?.heading && (
          <div className="Action">Action</div>
        )}
      </div>
    </div>
  </>);
};

export default ContactsBodyHead;
