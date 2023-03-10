import express, { Router, Request, Response } from "express"
import { CompanyController } from "../controllers/companyController"
import { LikeController } from "../controllers/likeController"
import { LoginController } from "../controllers/loginController"
import { PostController } from "../controllers/postController"
import { UserController } from "../controllers/userController"
import { isAuth } from "../helpers/isAuth/index"

export class Routes {
  router: express.IRouter

  constructor() {
    this.router = Router()

    this.home()
    this.user()
    this.post()
    this.company()
    this.like()
    this.login()
  }

  home() {
    this.router.get("/", (req: Request, res: Response) => {
      return res.send("Hello World!")
    })

    this.router.get("/dashboard", isAuth, (req: Request, res: Response) => { return res.send("admin page") })
  }

  user() {
    this.router.post("/user/register", new UserController().create)
    this.router.get("/user/show/:id", new UserController().read)
    this.router.get("/user/showAll", new UserController().readAll)
    this.router.put("/user/update/:id", new UserController().update)
    this.router.delete("/user/delete/:id", new UserController().delete)
  }

  post() {
    this.router.post("/post/create/:company_id", new PostController().create)
    this.router.get("/post/showAll", new PostController().readAll)
    this.router.get("/post/show/:id", new PostController().read)
    this.router.put("/post/update/:post_id/:company_id", new PostController().update)
    this.router.delete("/post/delete/:post_id/:company_id", new PostController().delete)
  }

  company() {
    this.router.post("/company/create", new CompanyController().create)
    this.router.get("/company/showAll", new CompanyController().readAll)
    this.router.get("/company/show/:id", new CompanyController().read)
    this.router.put("/company/update/:id", new CompanyController().update)
    this.router.delete("/company/delete/:id", new CompanyController().delete)
  }

  like() {
    this.router.post("/liked/:user_id/:post_id", new LikeController().liked)
  }

  login() {
    this.router.post("/login", new LoginController().login)
    this.router.post("/logout", new LoginController().logout)
  }
}
