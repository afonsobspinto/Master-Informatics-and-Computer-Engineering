import { Video } from './Video';

export class User {
    id: number;
    username: string;
    email: string;
    uploaded: Video[];
    isAdmin: boolean;
    token: string;
}
