const React = require("react");
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");
import Identicon from "../../ui/app/components/identicon";

class Contacts extends React.Component {
  onAddContact = () => {
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(actions.displayWarning(""));
    this.props.onAddContactClicked
      ? this.props.onAddContactClicked()
      : this.props.dispatch(actions.showAddContactsPage());
  };

  ViewContactDetails = contactObj => {
    this.props.dispatch(actions.displayWarning(""));
    this.props.onViewContactDetails
      ? this.props.onViewContactDetails(contactObj)
      : this.props.dispatch(actions.contactDetails(contactObj));
  };

  onBackToContacts = () => {
    this.props.dispatch(actions.displayWarning(""));
    // eslint-disable-next-line react/prop-types
    this.props.backToContacts
      ? this.props.backToContacts()
      : this.props.dispatch(actions.Contacts());
  };

  render() {
    const state = this.props;
    const contactList = state.metamask.addressBook;
    contactList.sort(function(a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    return (
      <div className="flex-column flex-grow">
        <div
          className="section-title flex-row titleAdd"
          style={{
            borderBottom: "1px solid #E3E7EB",
            paddingBottom: "17px",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <img
            src="/images/Assets/BackArrow.svg"
            className="image-display"
            style={{ marginLeft: "17px", cursor: "pointer" }}
            onClick={() => state.dispatch(actions.goConfig())}
          />
          <h2 style={{ fontFamily: "Inter-bold", color: "#2A2A2A" }}>
            Contacts
          </h2>
          <img
            src="/images/Assets/Add.svg"
            className="titleAddImage"
            onClick={this.onAddContact}
            // state.dispatch(actions.showAddContactsPage())}
          />
        </div>
        <div className="list"  style={{
          maxHeight: "697px",
          overflowY: "auto"
        }}>
          {contactList.length ? (
            contactList.map((contactObj, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid #E3E7EB",
                  fontFamily: "inter-medium",
                  fontSize: "14px"
                }}
              >
                {index === 0 ||
                contactList[index].name.charAt(0).toLowerCase() !==
                  contactList[index - 1].name.charAt(0).toLowerCase() ? (
                  <div
                    style={{
                      backgroundColor: "#F4F6FA",
                      height: "24px",
                      width: "100%",
                      padding: "0 21px"
                    }}
                  >
                    {contactList[index].name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  ""
                )}
                <div
                  style={{
                    padding: "10px 20px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px"
                  }}
                >
                  <Identicon
                    overflow="none"
                    address={contactObj.address.replace("xdc", "0x")}
                    diameter={27}
                    style={{
                      marginLeft: "10px",
                      cursor: "pointer",
                      overflow: "inherit"
                    }}
                  />
                  <div
                    style={{
                      width: "fit-content",
                      cursor: "pointer",
                      padding: "3px 0 0 0"
                    }}
                    onClick={() => {
                      this.ViewContactDetails(contactObj);
                    }}
                  >
                    {contactObj.name}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className="noContactsTitle"
              style={{
                // margin: "182px 113px",
                color: "#9FA9BA",
                fontSize: "14px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              No Contacts Added
            </div>
          )}{" "}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    identities: state.metamask.identities
  };
}

module.exports = connect(mapStateToProps)(Contacts);
