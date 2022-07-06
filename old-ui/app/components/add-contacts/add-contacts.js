import React from "react";

const AddContactComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    onStateChange,
    onAddContactClicked,
    warningMsg,
    onBackClick,
    t,
    viewContactObj,
    onDeleteClicked,
    state,
    detailObj,
  } = props;
  console.log(detailObj, viewContactObj, "comong");
  var viewContact = viewContactObj;
  !viewContact ? (viewContact = detailObj) : viewContact;
  console.log(viewContact, detailObj, "comon");
  const { contactAddress, contactName } = state;
  console.log(contactAddress, contactName,state, "details");

  return (
    <div
      className="flex-column flex-grow"
      style={{ maxHeight: "585px", overflowY: "auto" }}
    >
      <div
        className="section-title flex-row addContactTitle"
        style={{
          borderBottom: "1px solid #E3E7EB",
          paddingBottom: "17px",
        }}
      >
        <img
          src="/images/Assets/BackArrow.svg"
          style={{ marginLeft: "17px", cursor: "pointer" }}
          onClick={onBackClick}
        />
        <h2
          style={{
            fontFamily: "Inter-bold",
            fontSize: "15px",
            color: "#2A2A2A",
            marginRight: "20px",
          }}
        >
          {`${viewContact ? "Edit" : "Add"} Contact`}
        </h2>
        <h2
          style={{
            color: "#FF0035",
            fontSize: "15px",
            fontFamily: "Inter-Medium",
            marginRight: "15px",
            cursor: "pointer",
          }}
          onClick={() => onDeleteClicked(viewContact)}
        >
          {`${viewContact ? "Delete" : " "}`}
        </h2>
      </div>
      <div style={{ margin: "25px 42px" }}>
        <label className="word" style={{ fontFamily: "Inter-Medium" }}>
          {`Wallet Address`}
        </label>
        <br />
        <div
          style={{
            marginBottom: "24px",
            border: "1px solid #C7CDD8",
            borderRadius: "4px",
          }}
        >
          <input
            className="input large-input"
            type="text"
            name="contactAddress"
            value={contactAddress}
            autoComplete='off'
            placeholder="Contact's Wallet Address"
            onChange={onStateChange}
            style={{ width: "100%", border: "none", color: "#2A2A2A" }}
          />
          {/* <img
            src="/images/Assets/Scan.svg"
            style={{position: 'absolute', right: '49px', top: '161px'}}
          /> */}
        </div>
        <label className="word" style={{ fontFamily: "Inter-Medium" }}>
          {`Username`}
        </label>
        <br />
        <div
          style={{
            // marginBottom: "45px",
            border: "1px solid #e2e2e2",
            borderRadius: "4px",
          }}
        >
          <input
            className="input large-input"
            placeholder="Contact's Name"
            type="text"
            name="contactName"
            autoComplete='off'
            value={contactName}
            onChange={onStateChange}
            style={{ width: "100%", border: "none", color: "#2A2A2A" }}
          />
        </div>
        {warningMsg && <div className="error" style={{
          margin:'9px 0 -9px 0'
        }}>{warningMsg}</div>}
        
        <div style={{ display: "flex", justifyContent: "space-between",margin:'18px 0' }}>
          <div
            className="button"
            // onClick={onBackClick}
            style={{
              fontFamily: "Inter-Medium",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
              background: "#E3E7EB",
              width: "120px",
              height: "40px",
              border: "none",
              color: "#2a2a2a",
            }}
            onClick={() => {
              onBackClick();
            }}
          >
            {`${t("cancel")}`}
          </div>

          <div
            className="button"
            style={{
              fontFamily: "Inter-Medium",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
              background: "#03BE46",
              width: "120px",
              height: "40px",
              border: "none",
            }}
            onClick={(event) => {
              event.preventDefault();
              onAddContactClicked(!!viewContact);
            }}
          >
            {`${!!viewContact ? "Update" : "Save"}`}
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = AddContactComponent;
