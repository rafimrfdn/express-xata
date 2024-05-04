import express from 'npm:express@4.18.2';

import { createUser, 
    getAllUsers, 
    getUserForUpdate, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';

const router = express.Router();

router.get('/index');

router.post('/create-user', createUser);
router.get('/all', getAllUsers);

router.get('/users/:id/edit', getUserForUpdate);  // Route to get user for update form
router.patch('/users/:id', updateUser); // Update user route

router.delete('/users/:id', deleteUser); // Delete user route

export default router ;

