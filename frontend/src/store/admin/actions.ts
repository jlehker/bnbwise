import { api } from '@/api';
import { ActionContext } from 'vuex';
import { IUserProfileCreate, IUserProfileUpdate, IStationCreate, IStationUpdate, IPropertyCreate, IPropertyUpdate, IItemCreate, IItemUpdate } from '@/interfaces';
import { State } from '../state';
import { AdminState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { commitSetUsers, commitSetUser, commitSetStation, commitSetStations, commitSetProperty, commitSetProperties, commitSetItem, commitSetItems } from './mutations';
import { dispatchCheckApiError } from '../main/actions';
import { commitAddNotification, commitRemoveNotification } from '../main/mutations';

type MainContext = ActionContext<AdminState, State>;

export const actions = {
    async actionGetUsers(context: MainContext) {
        try {
            const response = await api.getUsers(context.rootState.main.token);
            if (response) {
                commitSetUsers(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionDownloadQR(context: MainContext, payload: { id: number, title: string }) {
        try {
            const loadingNotification = { content: 'downloading', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.downloadQR(context.rootState.main.token, payload.id),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            const type = response.headers['content-type'];
            const url = window.URL.createObjectURL(new Blob([response.data], {type}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${payload.title}-qrcode.png`);  // or any other extension
            document.body.appendChild(link);
            link.click();
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'QR code successfully downloaded', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionDownloadQRZip(context: MainContext) {
        try {
            const loadingNotification = { content: 'downloading', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.downloadQRZip(context.rootState.main.token),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            const type = response.headers['content-type'];
            const url = window.URL.createObjectURL(new Blob([response.data], {type}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'qrcode.zip');  // or any other extension
            document.body.appendChild(link);
            link.click();
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'QR code successfully downloaded', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionUpdateUser(context: MainContext, payload: { id: number, user: IUserProfileUpdate }) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.updateUser(context.rootState.main.token, payload.id, payload.user),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetUser(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'User successfully updated', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionCreateUser(context: MainContext, payload: IUserProfileCreate) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.createUser(context.rootState.main.token, payload),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetUser(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'User successfully created', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionUpdateItem(context: MainContext, payload: { id: number, item: IItemUpdate }) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.updateItem(context.rootState.main.token, payload.id, payload.item),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetItem(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'Item successfully updated', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionGetItems(context: MainContext) {
        try {
            const response = await api.getItems(context.rootState.main.token);
            if (response) {
                commitSetItems(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionCreateItem(context: MainContext, payload: IItemCreate) {
        try {
            const loadingNotification = { content: 'savingitem', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.createItem(context.rootState.main.token, payload),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetItem(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'Item successfully created', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionUpdateStation(context: MainContext, payload: { id: number, station: IStationUpdate }) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.updateStation(context.rootState.main.token, payload.id, payload.station),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetStation(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'Station successfully updated', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionGetStations(context: MainContext) {
        try {
            const response = await api.getStations(context.rootState.main.token);
            if (response) {
                commitSetStations(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionCreateStation(context: MainContext, payload: IStationCreate) {
        try {
            const loadingNotification = { content: 'savingstation', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.createStation(context.rootState.main.token, payload),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetStation(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'Station successfully created', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionUpdateProperty(context: MainContext, payload: { id: number, property: IPropertyUpdate}) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.updateProperty(context.rootState.main.token, payload.id, payload.property),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetProperty(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'Property successfully updated', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionGetProperties(context: MainContext) {
        try {
            const response = await api.getProperties(context.rootState.main.token);
            if (response) {
                commitSetProperties(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionCreateProperty(context: MainContext, payload: IPropertyCreate) {
        try {
            const loadingNotification = { content: 'savingproperty', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.createProperty(context.rootState.main.token, payload),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetProperty(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'Property successfully created', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
};

const { dispatch } = getStoreAccessors<AdminState, State>('');

// Users
export const dispatchGetUsers = dispatch(actions.actionGetUsers);
export const dispatchCreateUser = dispatch(actions.actionCreateUser);
export const dispatchUpdateUser = dispatch(actions.actionUpdateUser);

// Stations
export const dispatchGetStations = dispatch(actions.actionGetStations);
export const dispatchCreateStation = dispatch(actions.actionCreateStation);
export const dispatchUpdateStation = dispatch(actions.actionUpdateStation);
export const dispatchDownloadQR = dispatch(actions.actionDownloadQR);
export const dispatchDownloadQRZip = dispatch(actions.actionDownloadQRZip);

// Properties
export const dispatchGetProperties = dispatch(actions.actionGetProperties);
export const dispatchCreateProperty = dispatch(actions.actionCreateProperty);
export const dispatchUpdateProperty = dispatch(actions.actionUpdateProperty);

// Items
export const dispatchGetItems = dispatch(actions.actionGetProperties);
export const dispatchCreateItem = dispatch(actions.actionCreateItem);
export const dispatchUpdateItem = dispatch(actions.actionUpdateItem);
