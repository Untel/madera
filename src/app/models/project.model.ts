import { User } from './user.model';
import { Object } from './object.model';

export interface Project {
    title: string;
    description: string;
    pictures: string[];

    reference?: string;

    commercials?: string[];
    client?: string;

    $commercials?: User[];
    $client?: User;

    modules?: Array<any>;

    step: number,

    $key?: string;
    $exists?: any;
}