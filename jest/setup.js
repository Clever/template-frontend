require("core-js");
require("isomorphic-fetch");
require("raf/polyfill");

const configureEnzyme = require("enzyme").configure;
const EnzymeAdapter = require("enzyme-adapter-react-16");

configureEnzyme({ adapter: new EnzymeAdapter() });
