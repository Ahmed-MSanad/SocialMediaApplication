import { Router } from "express";
import { isValid } from "../../middlewares/validation.middleware.js";

import * as authService from "./auth.service.js";
import * as authvalidation from "./auth.validation.js";

const router = Router();


router.post("/register",isValid(authvalidation.register) ,authService.register);

router.post("/login", isValid(authvalidation.login),authService.login);



  export default router;