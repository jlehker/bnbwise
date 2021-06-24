export interface IUserProfile {
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    full_name: string;
    id: number;
}

export interface IUserProfileUpdate {
    email?: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserProfileCreate {
    email: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IProperty {
    title: string;
    id: number;
}

export interface IPropertyCreate {
    title: string;
}

export interface IPropertyUpdate {
    title: string;
}

export interface IStation {
    title: string;
    id: number;
    property_id: number | null;
}

export interface IStationCreate {
    title: string;
    property_id: number | null;
}

export interface IStationUpdate {
    title: string;
    property_id: number | null;
}

export interface IItem {
    title: string;
    description: string;
    id: number;
    station_id: number | null;
}

export interface IItemCreate {
    title: string;
    description: string;
    station_id: number | null;
}

export interface IItemUpdate {
    title: string;
    description: string;
    station_id: number | null;
}
