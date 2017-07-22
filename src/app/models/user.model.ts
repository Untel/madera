export interface User {
    displayName: string;
    photoUrl: string;
    role: string;

    uid: string;

    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    $key?: string;
    $exists?: any;
}