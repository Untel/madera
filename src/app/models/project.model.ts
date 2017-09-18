import { User } from './user.model';
import { Object } from './object.model';

export interface Project {
    title: string;
    description: string;
    pictures: string[];

    devis?: any[];

    commercials?: string[];
    client?: string;

    $commercials?: User[];
    $client?: User;

    $key?: string;
    $exists?: any;
}