import { IUserProfile, IStation, IProperty, IItem } from '@/interfaces';
import { AdminState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
    setUsers(state: AdminState, payload: IUserProfile[]) {
        state.users = payload;
    },
    setUser(state: AdminState, payload: IUserProfile) {
        const users = state.users.filter((user: IUserProfile) => user.id !== payload.id);
        users.push(payload);
        state.users = users;
    },
    setStations(state: AdminState, payload: IStation[]) {
        state.stations = payload;
    },
    setStation(state: AdminState, payload: IStation) {
        const stations = state.stations.filter((station: IStation) => station.id !== payload.id);
        stations.push(payload);
        state.stations = stations;
    },
    setItems(state: AdminState, payload: IItem[]) {
        state.items = payload;
    },
    setItem(state: AdminState, payload: IItem) {
        const items = state.items.filter((item: IItem) => item.id !== payload.id);
        items.push(payload);
        state.items = items;
    },
    setProperties(state: AdminState, payload: IProperty[]) {
        state.properties = payload;
    },
    setProperty(state: AdminState, payload: IProperty) {
        const properties = state.properties.filter((property: IProperty) => property.id !== payload.id);
        properties.push(payload);
        state.properties = properties;
    },
};

const { commit } = getStoreAccessors<AdminState, State>('');

export const commitSetItem = commit(mutations.setItem);
export const commitSetItems = commit(mutations.setItems);

export const commitSetProperty = commit(mutations.setProperty);
export const commitSetProperties = commit(mutations.setProperties);

export const commitSetStation = commit(mutations.setStation);
export const commitSetStations = commit(mutations.setStations);

export const commitSetUser = commit(mutations.setUser);
export const commitSetUsers = commit(mutations.setUsers);
