import * as React from "react";
import { render } from "react-dom";

import { App } from "./App";
import { boot } from "src/ui/lib/boot";

boot();

render(<App />, document.getElementById("__APP__"));
