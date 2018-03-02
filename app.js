let http = require("http");
const https = require('https');

let dat;

let server = http.createServer(function (req, res) {
    // console.log("req was made " + req.url);
    // console.log(req);
    req.on("data", function (data) {
        dat = data.toString("utf8");
        getData(dat);
    });

    function getData(dat) {
        https.get(dat, (resp) => {
            let dataVK = '';
            resp.on('data', (chunk) => {
                dataVK += chunk;
            });
            resp.on('end', () => {
                sent(dataVK);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

    function sent(dat) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        let obj = {
            // name: "vk",
            // item: "fuck",
            data: dat
        };
        // console.log(dat)
        res.end(JSON.stringify(obj));
        // console.log(obj);
    }

});

server.listen(3000, "127.0.0.1");