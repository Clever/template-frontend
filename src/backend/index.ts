import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
// import * as discovery from "clever-discovery";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("build"));

// Etags aren't properly handled by all browsers so we outright disable all caching on
// our API methods.
app.use((req, res, next) => {
  res.header("Cache-Control", "no-cache");
  next();
});

app.get("/_healthcheck", (req, res) => {
  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/frontend/index.html`);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
