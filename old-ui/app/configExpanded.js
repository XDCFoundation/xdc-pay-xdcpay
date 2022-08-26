import AddNetwork from "./components/add-network";

const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");
import React from "react";
import GeneralSettings from "../../old-ui/app/general-settings";
import AdvanceSettings from "../../old-ui/app/advance-settings";
import SecurityAndPrivacySettings from "./components/security-and-privacy/security-and-privacy";
import Contacts from "./Contacts";
import NetworkSettings from "./network-settings";
import InfoScreen from "./info";
import AddContact from "./components/add-contacts";
import ContactDetails from "./components/add-contacts/contactDetails";

export default class ConfigScreenExpanded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedComponent: "generalSettings",
      detailObj: "",
    };
  }

  setComponent = (selectedComponent, detailObj) => {
    this.setState({ selectedComponent, detailObj });
  };

  render() {
    const state = this.props;
    return (
      <div
        className="sidebar settingsExpanded"
        style={{
          width: "100%",
          borderBottom: "1px solid #E3E7EB",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "left",
            height: "42px",
            padding: "11px 0 0 10px",
            borderBottom: "1px solid #E3E7EB",
          }}
        >
          <img
            style={{
              cursor: "pointer",
              height: "14px",
              width: "14px",
              margin: "2px 0 0 5px",
            }}
            src="/images/Assets/Close.svg"
            onClick={() => {
              state.dispatch(actions.goHome());
            }}
          />
          <h2 style={{ margin: "-3px 0px 0px 15px", fontFamily: "Inter-Bold" }}>
            Settings
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            width: "21%",
            position: "absolute",
            left: "0",
            height: "100%",
            borderRight: "1px solid #E3E7EB ",
          }}
        >
          <div>
            <div
              className="settings"
              id="generalSettings"
              onClick={() =>
                this.setState({ selectedComponent: "generalSettings" })
              }
            >
              <h2 style={{color:  this.state.selectedComponent === "generalSettings"   ? '#2049B9' : '#2a2a2a'}}> General Settings </h2>
            </div>
            <div
              className="settings"
              id="advanceSettings"
              onClick={() =>
                this.setState({ selectedComponent: "advanceSettings" })
              }
            >
              <h2 style={{color:  this.state.selectedComponent === "advanceSettings"  ? '#2049B9' : '#2a2a2a'}}>Advance Settings</h2>
            </div>
            <div
              className="settings"
              id={"securityAndPrivacySettings"}
             
              onClick={() =>
                this.setState({
                  selectedComponent: "securityAndPrivacySettings", selectorActive: true
                })
              }
            >
              <h2  style={{color:  this.state.selectedComponent === "securityAndPrivacySettings"  ? '#2049B9' : '#2a2a2a'}}>Security and Privacy Settings</h2>
            </div>

            <div
              className="settings"
              id={"addContact"}
              onClick={() =>
                this.setState({
                  selectedComponent: "Contacts"
                })
              }
            >
              <h2 style={{color:  this.state.selectedComponent === "Contacts"  ? '#2049B9' : '#2a2a2a'}}>Contacts</h2>
            </div>
            <div
              className="settings"
              id={"addNetwork"}
              onClick={() =>
                this.setState({ selectedComponent: "NetworkSettings", selectorActive: true })
              }
            >
              <h2 style={{color:  this.state.selectedComponent === "NetworkSettings"  ? '#2049B9' : '#2a2a2a'}}>Network Settings</h2>
            </div>

            <div
              className="settings"
              id={"infoScreen"}
              onClick={() => this.setState({ selectedComponent: "infoScreen" })}
            >
              <h2 style={{color:  this.state.selectedComponent === "infoScreen"  ? '#2049B9' : '#2a2a2a'}}>About</h2>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "79%",
            display: "flex",
            position: "absolute",
            right: "0",
          }}
        >
          {this.state.selectedComponent === "generalSettings" && (
            <GeneralSettings />
          )}
          {this.state.selectedComponent === "advanceSettings" && (
            <AdvanceSettings />
          )}
          {this.state.selectedComponent === "securityAndPrivacySettings" && (
            <SecurityAndPrivacySettings />
          )}

          {this.state.selectedComponent === "Contacts" && (
            <Contacts
              onAddContactClicked={() => this.setComponent("AddContact")}
              onViewContactDetails={
                (contactObj) => this.setComponent("ContactDetails", contactObj)
                // this.props.dispatch(actions.contactDetails(contactObj))
              }
            />
          )}
          {this.state.selectedComponent === "AddContact" && (
            <AddContact detailObj={this.state.detailObj} backToContacts={() => this.setComponent("Contacts")} />
          )}
          {this.state.selectedComponent === "ContactDetails" && (
            <ContactDetails
              detailObj={this.state.detailObj}
              backToContacts={() => this.setComponent("Contacts")}
              onAddContactClicked={(contactObj) => this.setComponent("AddContact",contactObj)}
            />
          )}
          {this.state.selectedComponent === "NetworkSettings" && (
            <NetworkSettings
              onAddNetworkClicked={(networkObj) => this.setComponent("AddNetwork", networkObj)}
              backToSetting={() => this.setComponent('generalSettings')}
            />
          )}
          {this.state.selectedComponent === "AddNetwork" && (
            <AddNetwork detailObj={this.state.detailObj}
              backToNetwork={() => this.setComponent("NetworkSettings")}
            />
          )}

          {this.state.selectedComponent === "infoScreen" && <InfoScreen
            backToSetting = {()=> this.setComponent('generalSettings')}
          />}
        </div>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps)(ConfigScreenExpanded);

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    screenKey: state.metamask.screenKey,
  };
}
