import { IUserProfile, IStation, IProperty, IItem } from '@/interfaces';

export interface AdminState {
    users: IUserProfile[];
    stations: IStation[];
    properties: IProperty[];
    items: IItem[];
}
