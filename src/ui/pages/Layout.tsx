import * as React from 'react';
import { Wizard } from 'clever-components';

import './App.less';

export default class Layout extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    // TODO: define a true layout for the application.
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
}
