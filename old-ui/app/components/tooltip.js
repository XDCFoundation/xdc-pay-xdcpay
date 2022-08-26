import React from "react";
import { Tooltip as ReactTooltip } from "react-tippy";

export default function Tooltip({ message, value, children }) {

  return (
    <ReactTooltip
      arrow={true}
      trigger={'mouseenter focus'}
      position='bottom'
      size='small'
      title={message}
      theme='dark'
    >
      {children}
    </ReactTooltip>
  );
}
