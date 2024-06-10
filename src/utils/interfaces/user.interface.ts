export default interface User {
    id: number;
    email: string;
    password: string;
    role: string;
    token: string;
    subscription: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    comparePassword(password: string): Promise<boolean>;
}
