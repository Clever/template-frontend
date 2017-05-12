import * as React from "react";
import {Wizard} from "clever-components"

import "./App.less";

export default class Layout extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {	
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
