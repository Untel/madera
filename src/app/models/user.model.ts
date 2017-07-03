export interface User {
    displayName: string;
    photoUrl: string;
    role: string;

    $key?: string;
    $exists?: any;
}