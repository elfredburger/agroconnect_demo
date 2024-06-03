import 'dotenv/config';
import 'module-alias/register';
//import validateEnv from "./utils/validateEnv";
import App from './app';
import UserContoller from './resources/users/users.contoller';

//validateEnv();
const app = new App([new UserContoller()], 3000);

app.listen();
