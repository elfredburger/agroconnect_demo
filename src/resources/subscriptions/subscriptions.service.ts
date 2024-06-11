import { getAllDb } from '@/utils/scripts/sqlQueries';
import Subscription from '@/utils/interfaces/subscription.interface';

class SubscriptionsService {
    public async getAllSubscriptions(): Promise<Subscription[]> {
        return getAllDb('subscriptions');
    }
}
export default SubscriptionsService;
