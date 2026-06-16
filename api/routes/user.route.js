import express from 'express';
import { test ,updateUser} from '../controllers/user.controller.js';

const route = express.Router();

route.get('/test', test)

route.put('/update/:id',updateUser);

export default route;