import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import actions from "../../../../ui/app/actions";
import Select from "react-select";
import { importTypes } from "./enums";
import { nestedJsonObjToArray } from "./helpers";

// Subviews
import JsonImportView from "./json.js";
import PrivateKeyImportView from "./private-key.js";
import ContractImportView from "./contract.js";

const menuItems = nestedJsonObjToArray(importTypes);

class AccountImportSubview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      type: importTypes.PRIVATE_KEY,
    };
  }
  static propTypes = {
    menuItems: PropTypes.array,
    warning: PropTypes.node,
    goHome: PropTypes.func,
    displayWarning: PropTypes.func,
    showImportPage: PropTypes.func,
  };
  render() {
    const props = this.props;
    const state = this.state || {};
    const { menuItems } = props;
    const { type } = state;

    return (
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          className="section-title"
          style={{
            height: "1px",
            width: "100%",
          }}
        />
        <div
          style={{
            width: "100%",
            padding: "0 30px",
          }}
        >
          <div className="flex-row flex-center">
            <img
             src={ "/images/Assets/BackArrow.svg"} 
             style={{
               position: "absolute",
               left: "15px",
               cursor: "pointer",
              }}
              
              onClick={(event) => {
                props.goHome();
              }}
            />
            
            <h2
              className="page-subtitle"
              style={{
                fontFamily: "Inter-SemiBold",
                fontSize: "15px",
              }}
            >
              Import Accounts
            </h2>
          </div>
          <div style={{
            margin: '0 20px ',
          }}>
          <div
            className="error importError"
            style={{
              display: "inline-block",
              alignItems: "center",
              marginTop: '13px',
              // border: "1px solid red",
              alignItems: "center",
              maxWidth: '100%',
              // marginLeft: "20px",
              backgroundPosition: '15px 30px'
            }}
          >
            <span>
              Imported accounts will not be associated with your originally
              created XDCPay account seed phrase.
            </span>
            </div>
            </div>
          <div style={{ padding: "10px 20px" }}>
            <h3 style={{ fontSize: "12px", fontFamily: "Inter-SemiBold" }}>
              Select Type
            </h3>
            <Select
              {...{
                name: "import-type-select",
                clearable: false,
                value: type || menuItems[0],
                options: menuItems.map((type) => {
                  return {
                    value: type,
                    label: type,
                  };
                }),
                onChange: (opt) => {
                  this.onChange(opt);
                },
              }}
              style={{cursor: 'pointer'}}
            />
            <p
              style={{fontFamily: 'Inter-Regular', fontSize: '14px', lineHeight: '16px',}}
              className="hw-connect__header__msg"
              dangerouslySetInnerHTML={{ __html: this.state.description }}
            />
          </div>
          {this.renderImportView()}
        </div>
      </div>
    );                                                                                                                                                                                                                                                                                           
  }

  onChange(opt) {
    const props = this.props;
    props.showImportPage();
    const type = opt.value;
    let description;
    switch (type) {
      case importTypes.PRIVATE_KEY:
        description = "";
        break;
      case importTypes.JSON_FILE:
        description = "";
        break;
      // case importTypes.PRIVATE_KEY.DEFAULT:
      //   description = `Contract type will automatically retrieve its ABI, if it was verified in <a href='https://blockscout.com' target='_blank'>Blockscout</a>`;
      //   break;
      // case importTypes.PRIVATE_KEY.PROXY:
      //   description = `Proxy contract type will automatically contain ABI of implementation, if proxy and implementation were both verified in <a href='https://blockscout.com' target='_blank'>Blockscout</a>`;
      //   break;
      default:
        description = "";
        break;
    }
    this.setState({ type, description });
  }

  componentWillUnmount() {
    this.props.displayWarning("");
  }
  renderImportView() {
    const { menuItems } = this.props;
    const state = this.state || {};
    const { type } = state;
    const current = type || menuItems[0];

    switch (current) {
      case importTypes.PRIVATE_KEY:
        return <PrivateKeyImportView type={importTypes.PRIVATE_KEY}/>;
      case importTypes.JSON_FILE:
        return <JsonImportView />;
      // case importTypes.CONTRACT.DEFAULT:
      //   return <ContractImportView type={importTypes.CONTRACT.DEFAULT} />;
      // case importTypes.CONTRACT.PROXY:
      //   return <ContractImportView type={importTypes.CONTRACT.PROXY} />;
      default:
        return <PrivateKeyImportView />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    menuItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goHome: () => dispatch(actions.goHome()),
    displayWarning: (warning) => dispatch(actions.displayWarning(warning)),
    showImportPage: (options) => dispatch(actions.showImportPage()),
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountImportSubview);
