import  express from "express"
import  {register, login, getUser,followUser, unfollowUser} from "../controller/UserAuthentication.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUser);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);

export default router;