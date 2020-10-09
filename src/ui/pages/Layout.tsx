import * as React from "react";

import "./App.less";

interface Props {}

export class Layout extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    // TODO: define a true layout for the application.
    return <main>{this.props.children}</main>;
  }
}
