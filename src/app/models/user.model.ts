export interface User {
    displayName: string;
    photo: string;
    role: string;

    uid: string;

    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    $key?: string;
    $exists?: any;
}