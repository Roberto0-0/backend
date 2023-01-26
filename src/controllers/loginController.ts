import { NextFunction, Request, Response } from "express";
import passport from "passport"

export class LoginController {
  login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/",
      failureFlash: true
    })(req, res, next)
  }

  logout(req: Request, res: Response, next: NextFunction) {
    req.logout(function(err) {
      if(err) { return next(err) }
      res.status(200).send({ message: "logout!" })
    })
  }
}