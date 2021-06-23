import express from "express";

let renderFunction = function (res: express.Response) {
    return (err: Error, html: string) => {
        if (err) {
            console.error(err);
            res.redirect("error.html");
        }
        else {
            res.send(html);
        }
    }
}

export default class WebRouter {
    private Router: express.Router;

    constructor() {
        this.Router = express.Router();

        this.Router.get("/", (req, res, next) => {
            res.render("index.ejs", {}, renderFunction(res));
        });

        this.Router.get("/login", (req, res, next) => {
            res.render("login.ejs", {req}, renderFunction(res));
        });

        this.Router.get("/register", (req, res, next) => {
            res.render("register.ejs", {}, renderFunction(res));
        });

        this.Router.get("/input_restaurant", (req, res, next) => {
            res.render("input_restaurant.ejs", {}, renderFunction(res));
        });
        
        this.Router.get("/login_failed", (req, res, next) => {
            res.render("login_failed.ejs", {}, renderFunction(res));
        })
    }

    public getRouter(): express.Router {
        return this.Router;
    }
}
