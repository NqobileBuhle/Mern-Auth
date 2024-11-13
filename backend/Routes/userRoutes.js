import express from 'express';
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUser} from '../controllers/userControllers.js';
const router = express.Router();

router.post('/',authUser);
router.post('/auth',registerUser);
router.post('/logout',logoutUser);
router.route('/profile').get(getUserProfile).put(updateUser);



export default router;
