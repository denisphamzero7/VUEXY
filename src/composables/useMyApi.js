import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export const getUsers = params => api.get("/users", { params })
export const getUserById = id => api.get(`/users/${id}`)
export const createUser = data => api.post("/users", data)
export const updateAUser = (id, data) => api.patch(`/users/${id}`, data)
export const deleteUser = id => api.delete(`/users/${id}`)

export const getCompanies = () => api.get("/companies")

// role
export const getRoles = (params, _limit) => api.get("/roles", { params })
export const getRoleById = id => api.get(`/roles/${id}`)
export const createRole = data => api.post("/roles", data)
export const updateRole = (id, data) => api.patch(`/roles/${id}`, data)
export const deleteRole = id => api.delete(`/roles/${id}`)

// permission
export const getPermissions = params => api.get("/permissions", { params })
export const getPermissionId = id => api.get(`/permissions/${id}`)
export const createPermission = data => api.post("/permissions", data)
export const updatePermission = (id, data) => api.patch(`/permissions/${id}`, data)
export const deletePermission = id => api.delete(`/permissions/${id}`)

// auth
export const login = credentials => api.post("/auth/login", credentials)
export const register = credentials => api.post("/auth/register", credentials)

export default api
