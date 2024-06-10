import 'dotenv/config';
import 'module-alias/register';
//import validateEnv from "./utils/validateEnv";
import App from './app';
import CompanyController from './resources/company/companies.controller';
import UserContoller from './resources/users/users.contoller';
import LotController from './resources/lots/lot.controller';
import BidController from './resources/bids/bids.controller';

//validateEnv();
const app = new App(
    [
        new UserContoller(),
        new CompanyController(),
        new LotController(),
        new BidController(),
    ],
    3000,
);

app.listen();
