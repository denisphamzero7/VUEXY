import axios from "axios";

import type { LoginCredentials,RegisterCredentials } from '../types/auth'
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getUsers = (params?: any) => api.get("/users", { params });
export const getUserById = (id: string) => api.get(`/users/${id}`);
export const createUser = (data: any) => api.post("/users", data);
export const updateAUser = (id: string, data: any) =>
  api.patch(`/users/${id}`, data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);



export const getCompanies = () => api.get("/companies");
//role
export const getRoles = (params?: any, limit?: unknown, limitParam?: number) => api.get("/roles",{params});
export const getRoleById = (id: string) => api.get(`/roles/${id}`);
export const createRole = ( data: any)=> api.post("/roles",data)
export const updateRole = (id: string, data: any)=> api.patch(`/roles/${id}`,data)
export const deleteRole = (id: string) => api.delete(`/roles/${id}`);
//permission
export const getPermissions = (params?: any) => api.get("/permissions",{params});

export const getPermissionId = (id: string) => api.get(`/permissions/${id}`);
export const createPermission =  (data: any)=> api.post("/permissions",data)


export const updatePermission = (id: string, data: any)=> api.patch(`/permissions/${id}`,data)
export const deletePermission = (id: string) => api.delete(`/permissions/${id}`);
//auth
export const login = (credentials: LoginCredentials) =>
  api.post("/auth/login", credentials);
export const register = (credentials: RegisterCredentials ) =>
  api.post("/auth/register",credentials);
export default api;
