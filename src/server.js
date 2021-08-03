const axios = require("axios");
const fs = require("fs")

const url = "http://www.igihe.com/amakuru/mu-mateka/tariki-20-nyakanga";

axios.get(url).then(async (resp) => {
    console.log(resp.data);
    const file = fs.writeFileSync("test.html", resp.data);
});