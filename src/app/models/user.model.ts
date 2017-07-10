export interface User {
    displayName: string;
    photoUrl: string;
    role: string;

    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    $key?: string;
    $exists?: any;
}