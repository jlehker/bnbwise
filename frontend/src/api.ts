import axios from 'axios';
import { apiUrl } from '@/env';
import { IUserProfile, IUserProfileUpdate, IUserProfileCreate, IStationCreate, IStationUpdate, IStation, IProperty, IPropertyCreate, IPropertyUpdate, IItem, IItemCreate, IItemUpdate } from './interfaces';

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`${apiUrl}/api/v1/login/access-token`, params);
  },
  async getMe(token: string) {
    return axios.get<IUserProfile>(`${apiUrl}/api/v1/users/me`, authHeaders(token));
  },
  async updateMe(token: string, data: IUserProfileUpdate) {
    return axios.put<IUserProfile>(`${apiUrl}/api/v1/users/me`, data, authHeaders(token));
  },
  async getUsers(token: string) {
    return axios.get<IUserProfile[]>(`${apiUrl}/api/v1/users/`, authHeaders(token));
  },
  async updateUser(token: string, userId: number, data: IUserProfileUpdate) {
    return axios.put(`${apiUrl}/api/v1/users/${userId}`, data, authHeaders(token));
  },
  async getStations(token: string) {
    return axios.get<IStation[]>(`${apiUrl}/api/v1/stations/`, authHeaders(token));
  },
  async createUser(token: string, data: IUserProfileCreate) {
    return axios.post(`${apiUrl}/api/v1/users/`, data, authHeaders(token));
  },
  async createStation(token: string, data: IStationCreate) {
    return axios.post(`${apiUrl}/api/v1/stations/`, data, authHeaders(token));
  },
  async updateStation(token: string, stationId: number, data: IStationUpdate) {
    return axios.put(`${apiUrl}/api/v1/stations/${stationId}`, data, authHeaders(token));
  },
  async getItems(token: string) {
    return axios.get<IItem[]>(`${apiUrl}/api/v1/items/`, authHeaders(token));
  },
  async createItem(token: string, data: IItemCreate) {
    return axios.post(`${apiUrl}/api/v1/items/`, data, authHeaders(token));
  },
  async updateItem(token: string, itemId: number, data: IItemUpdate) {
    return axios.put(`${apiUrl}/api/v1/items/${itemId}`, data, authHeaders(token));
  },
  async getProperties(token: string) {
    return axios.get<IProperty[]>(`${apiUrl}/api/v1/properties/`, authHeaders(token));
  },
  async createProperty(token: string, data: IPropertyCreate) {
    return axios.post(`${apiUrl}/api/v1/properties/`, data, authHeaders(token));
  },
  async updateProperty(token: string, propertyId: number, data: IPropertyUpdate) {
    return axios.put(`${apiUrl}/api/v1/properties/${propertyId}`, data, authHeaders(token));
  },
  async downloadQR(token: string, stationId: number) {
    return axios.get(`${apiUrl}/api/v1/stations/qrcode/${stationId}`, { ...{ responseType: 'arraybuffer' }, ...authHeaders(token) });
  },
  async downloadQRZip(token: string) {
    return axios.get(`${apiUrl}/api/v1/stations/qrcodes/`, { ...{ responseType: 'arraybuffer' }, ...authHeaders(token) });
  },
  async passwordRecovery(email: string) {
    return axios.post(`${apiUrl}/api/v1/password-recovery/${email}`);
  },
  async resetPassword(password: string, token: string) {
    return axios.post(`${apiUrl}/api/v1/reset-password/`, {
      new_password: password,
      token,
    });
  },
};
