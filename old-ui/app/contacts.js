const React = require("react");
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");
import Identicon from "../../ui/app/components/identicon";
import PropTypes  from "prop-types"

class Contacts extends React.Component {
  static propTypes = {
    identity: PropTypes.object.isRequired,
  }
  render() {
    const state = this.props;
    const contactList = state.metamask.contactList;
    const netList = [...contactList];



  //  const Contacts=netList.sort(
  //     (a, b) => {
  //       return a.netList.contactName
  //         .toLocaleLowerCase()
  //         .localeCompare(b.netList.contactName.toLocaleLowerCase())
  //     },
  //   )

  //   const ContactObjects = Contacts.map(({netList: {contactName}}) => {
  //     return {
  //       displayValue: `${contactName.toUpperCase()}`,
        
  //     }
  //   })
    return (
      <div
        className="flex-column flex-grow"
        style={{ maxHeight: "585px", overflowY: "auto" }}
      >
        <div
          className="section-title flex-row"
          style={{
            borderBottom: "1px solid #E3E7EB",
            paddingBottom: "17px",
            display: "flex",
            justifyContent: "space-between",
          }}
         >
          <img
            src="/images/Assets/BackArrow.svg"
            style={{ marginLeft: "17px", cursor: "pointer" }}
            onClick={() => {
              state.dispatch(actions.goConfig());
            }}
          />
          <h2 style={{ fontFamily: "Inter-bold" }}>Contacts</h2>
          <img
            src="/images/Assets/Add.svg"
            style={{ cursor: "pointer", marginRight: "11px" }}
            onClick={() => {
              state.dispatch(actions.showAddContactsPage());
            }}
          />
        </div>
        {netList.map((contactObj) => (
          <div
            style={{
              padding: " 11px 17px 11px 13px ",
              borderBottom: "1px solid #E3E7EB",
              fontFamily: "inter-medium",
              fontSize: "14px",
            }}
          >
            
           <span> 
         <Identicon
         overflow="none"
         address={contactObj.contactAddress}
         diameter={24}
              style={{ marginLeft: '10px', overflow:'inherit' }}
              />
              {/* {netList.sort((a, b) => {
                if (a.contactName < b.contactName) { return -1; }
                if (a.contactName > b.contactName) { return 1; }
                return 0; 
              })} */}
          </span>
          {contactObj.contactName}
          </div>
           ))}
         </div>
       );
     }
   }
   module.exports = connect(mapStateToProps)(Contacts);
   function mapStateToProps(state) {
     return {
       metamask: state.metamask,
       warning: state.appState.warning,
     };
   }
           
           
            