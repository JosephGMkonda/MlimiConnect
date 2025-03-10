import  express from "express"
import  {register, login, getUser} from "../controller/UserAuthentication.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUser);

export default router;