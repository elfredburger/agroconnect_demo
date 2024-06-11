import 'dotenv/config';
import 'module-alias/register';
//import validateEnv from "./utils/validateEnv";
import App from './app';
import CompanyController from './resources/company/companies.controller';
import UserContoller from './resources/users/users.contoller';
import LotController from './resources/lots/lot.controller';
import BidController from './resources/bids/bids.controller';
import AuthController from './resources/auth/auth.controller';
import CountriesController from './resources/countries/countries.controller';
import CompanyTypeController from './resources/company_types/comptype.controller';
import DstuController from './resources/dstu/dstu.controller';
import IncotermsController from './resources/incoterms/incoterms.controller';
import IsoController from './resources/iso/iso.controller';
import ListingStatusController from './resources/lstatuses/lstatus.controller';
import MeasureController from './resources/measure/measure.controller';
import ProductTypeController from './resources/product_type/ptype.controller';
import RegionController from './resources/region/region.controller';
import SortController from './resources/sort/sort.controller';
import SubscriptionsController from './resources/subscriptions/subscriptions.controller';

//validateEnv();
const app = new App(
    [
        new UserContoller(),
        new CompanyController(),
        new LotController(),
        new BidController(),
        new AuthController(),
        new CountriesController(),
        new CompanyTypeController(),
        new DstuController(),
        new IncotermsController(),
        new IsoController(),
        new ListingStatusController(),
        new MeasureController(),
        new ProductTypeController(),
        new RegionController(),
        new SortController(),
        new SubscriptionsController(),
    ],
    3000,
);

app.listen();
