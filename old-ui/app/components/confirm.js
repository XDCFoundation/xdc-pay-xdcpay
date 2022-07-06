import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ConfirmScreen extends Component {
  static propTypes = {
    subtitle: PropTypes.string.isRequired,
    renderAdditionalData: PropTypes.func,
    question: PropTypes.string.isRequired,
    withDescription: PropTypes.bool,
    description: PropTypes.string,
    onCancelClick: PropTypes.func.isRequired,
    onNoClick: PropTypes.func.isRequired,
    onYesClick: PropTypes.func.isRequired
  };

  render() {
    return (
      <div
        className="flex-column flex-grow"
        style={{
          overflowX: "auto",
          overflowY: "hidden"
        }}
      >
			<div className="section-title flex-row flex-center"
			style={{borderBottom:'1px solid #EDEDED',padding:'0 0 20px 0'}}>
          <img
            className="cursor-pointer"
            src="/images/Assets/Close.svg"
            onClick={() => this.props.onCancelClick()}
            style={{
              position: "absolute",
              left: "18px",
              width: "14px"
            }}
          />
          <h2 className="page-subtitle">{this.props.subtitle}</h2>
        </div>
        {this.props.withDescription ? (
          <div className='justify-Center' style={{margin: '30px 30px 0px', }}>
            <div className="error errorDeleteImport">{this.props.description}</div>
          </div>
        ) : null}
        {this.props.renderAdditionalData
          ? this.props.renderAdditionalData()
          : null}
        <div style={{ display: "flex", justifyContent: "center", }}>
          <p
            className="confirm-label remove-token"
            style={{
              textAlign: "center",
              background: "#FFF2F5",
              color: "#FF0035",
        }}
          >
            {this.props.question}
          </p>
        </div>
        <div
          style={{
					display: 'flex',
			  justifyContent:'center'
          }}
        >
          <button
            className="btn-violet btn-Width"
            onClick={() => this.props.onNoClick()}
            style={{
            //   display: "flex",
            //   position: "absolute",
            //   left: "46px",
            //   height: "40px",
            //   width: "119px",
            //   paddingLeft: "51px",
            //   paddingTop: "12px",
              background: "#FF0035"
            }}
          >
            Cancel
          </button>
				<button
					className="btn-Width"
            onClick={() => this.props.onYesClick()}
            // style={{
            //   display: "flex",
            //   position: "absolute",
            //   right: "46px",
            //   height: "40px",
            //   width: "119px",
            //   paddingLeft: "49px",
            //   paddingTop: "12px"
            // }}
          >
            Yes
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    metamask: state.metamask,
    warning: state.appState.warning
  };
};

module.exports = connect(mapStateToProps)(ConfirmScreen);
