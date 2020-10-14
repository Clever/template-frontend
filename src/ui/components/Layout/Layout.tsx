import * as classnames from "classnames";
import { TopBar } from "clever-components";
import * as React from "react";

import "./Layout.less";

function cssClass(element: string) {
  return `Layout--${element}`;
}

interface Props {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  windowTitle: string;
}

export function Layout(props: Props) {
  const { children, className, contentClassName, windowTitle } = props;

  React.useEffect(() => {
    document.title = `Clever | ${windowTitle}`;
  }, [windowTitle]);

  return (
    <div className={classnames(cssClass("container"), className)}>
      <TopBar logoHref="/" />
      <div className={classnames(cssClass("content"), contentClassName)}>{children}</div>
    </div>
  );
}
