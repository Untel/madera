export interface User {
    photo?: string;
    role: string;

    uid: string;

    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    displayName?: string;

    $key?: string;
    $exists?: any;
}