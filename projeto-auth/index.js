const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const passport = require("passport");


const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));



//gerenciador de seçao com cookies = cookie-session
app.use(
    cookieSession({
        name: "S3cret",
        keys: ["vueauthrandomkey"],
        maxAge: 10 * 60 * 1000,//1minuto
    })
)


app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes/administrador.route.js");
app.use(routes);

app.listen("3030", (request, response) => {
    console.log("Servidor na porta 3030 está em funcionamento");
});