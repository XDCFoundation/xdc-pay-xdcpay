const EventEmitter = require("events").EventEmitter;
const connect = require("react-redux").connect;
const h = require("react-hyperscript");
const actions = require("../../../ui/app/actions");
const React = require("react");
import PasswordStrengthMeter, {
  checkPassword
} from "../../../old-ui/app/components/PasswordStrengthMeter";

class createWalletScreen extends React.Component {
  constructor(props) {
    super(props);
    this.animationEventEmitter = new EventEmitter();
    this.state = {
      class: "JIII",
      password: "",
      passwordStrength: 0
    };
  }

  showRestoreVault = () => {
    this.props.dispatch(actions.showRestoreVault());
  };

  InitializeMenuScreen = () => {
    this.props.dispatch(actions.showInitializeMenu());
  };

  render() {
    const state = this.props;
    return (
      <RenderMenu
        state={state}
        showRestoreVault={this.showRestoreVault}
        InitializeMenuScreen={this.InitializeMenuScreen}
      />
    );
  }
}

const RenderMenu = props => {
  const { state, InitializeMenuScreen, showRestoreVault } = props;
  return h(".initialize-screen.flex-column.flex-center.flex-grow.cover", [
    h(".logo"),

    h(
      "div",
      {
        style: {
          color: "#9FA9BA",
          width: "201px",
          height: "34px",
          textAlign: "center",
          fontSize: "14px",
          fontFamily: "Inter-Regular",
          marginTop: "180px"
        }
      },
      "Create a new wallet or import an existing one"
    ),
    h(
      "button",
      {
        onClick: InitializeMenuScreen,
        style: {
          marginTop: 23,
          width: 265,
          height: 40,
          fontFamily: "Inter-Regular"
        }
      },
      "Create a new wallet"
    ),

    // h(".flex-row.flex-center.flex-grow", [
    h(
      "button",
      {
        onClick: showRestoreVault,
        style: {
          marginTop: 23,
          width: 265,
          height: 40,
          border: " 1px solid #0CBE46",
          color: "#03BE46",
          backgroundColor: "#FFFFFF",
          fontFamily: "Inter-Regular"
        }
      },
      "Import using seed phrase"
    )
    // ]),
  ]);
};

function mapStateToProps(state) {
  return {
    // state from plugin
    currentView: state.appState.currentView,
    warning: state.appState.warning
  };
}

module.exports = connect(mapStateToProps)(createWalletScreen);
