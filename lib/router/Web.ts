import express from "express";

export default class WebRouter {
    private Router: express.Router;

    constructor() {
        this.Router = express.Router();

        this.Router.get("/", (req, res, next) => {
            res.render("index.ejs", {}, (err, html) => {
                if (err) {
                    console.error(err);
                    res.redirect("error.html");
                }
                else {
                    res.send(html);
                }
            });
        });
    }

    public getRouter(): express.Router {
        return this.Router;
    }
}
