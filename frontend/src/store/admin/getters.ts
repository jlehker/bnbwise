import { AdminState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
    adminUsers: (state: AdminState) => state.users,
    adminOneUser: (state: AdminState) => (userId: number) => {
        const filteredUsers = state.users.filter((user) => user.id === userId);
        if (filteredUsers.length > 0) {
            return { ...filteredUsers[0] };
        }
    },
    properties: (state: AdminState) => state.properties,
    oneProperty: (state: AdminState) => (propertyId: number) => {
        const filteredProperties = state.properties.filter((property) => property.id === propertyId);
        if (filteredProperties.length > 0) {
            return { ...filteredProperties[0] };
        }
    },
    stations: (state: AdminState) => state.stations,
    oneStation: (state: AdminState) => (stationId: number) => {
        const filteredStations = state.stations.filter((station) => station.id === stationId);
        if (filteredStations.length > 0) {
            return { ...filteredStations[0] };
        }
    },
    items: (state: AdminState) => state.items,
    oneItem: (state: AdminState) => (itemId: number) => {
        const filteredItems = state.items.filter((item) => item.id === itemId);
        if (filteredItems.length > 0) {
            return { ...filteredItems[0] };
        }
    },
};

const { read } = getStoreAccessors<AdminState, State>('');

export const readOneProperty = read(getters.oneProperty);
export const readProperties = read(getters.properties);

export const readOneItem = read(getters.oneItem);
export const readItems = read(getters.items);

export const readOneStation = read(getters.oneStation);
export const readStations = read(getters.stations);

export const readAdminOneUser = read(getters.adminOneUser);
export const readAdminUsers = read(getters.adminUsers);
