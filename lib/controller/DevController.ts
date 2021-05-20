import { Request, Response, NextFunction } from "express";
import fs from "fs";

import sassInit from "../SassInit";
import logger from "../logger";

class DevController {
    public async quitServer(req: Request, res: Response, next: NextFunction) {
        res.end("Server Closed");
        process.exit();
    }

    public async testJWT(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ data: "Test", id: req.user });
    }

    public async getLog(req: Request, res: Response, next: NextFunction) {
        fs.readFile(
            "/home/gitlab-runner/.pm2/logs/index-out.log",
            (err, data) => {
                if (err) {
                    logger.error(err.toString());
                    res.status(400);
                }
                res.setHeader("Content-Type", "text/plain; charset=utf-8");
                res.status(200).send(data);
            }
        );
    }

    public async sassExec(req: Request, res: Response, next: NextFunction) {
        sassInit();
        res.status(200).send(`${new Date()}<br>파일 변환 완료`);
    }
}

export default new DevController();