import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type {
  LoginCredentials,
  RegisterCredentials,
  TokenData,
  AuthUser
} from "../types/auth";
import { login as loginApi, register as registerApi } from "../api/index";
import { useAbilityStore } from "./abilityStore";


export const useAuthStore = defineStore("auth", () => {
  const credentials = reactive<LoginCredentials>({
    username: "",
    password: "",
  });
  const form = reactive<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
    address:"",
    age: null,
    gender: "",
    phone: null,
  });
  const user = ref<AuthUser | null>(null);
  const tokens = ref<TokenData | null>(null);
  const isAuthenticated = ref(false);
  function init() {
    console.log('Auth store: Initializing from localStorage...');
    const rawUser = localStorage.getItem("user");
    const rawAccess = localStorage.getItem("accessToken");
    const rawRefresh = localStorage.getItem("refreshToken");
    
    console.log('Auth store: Found in localStorage:', { 
      hasUser: !!rawUser, 
      hasAccessToken: !!rawAccess, 
      hasRefreshToken: !!rawRefresh 
    });
    
    if (rawUser && rawAccess) {
      try {
        user.value = JSON.parse(rawUser);
        tokens.value = { accessToken: rawAccess, refreshToken: rawRefresh || undefined };
        isAuthenticated.value = true;
        
        console.log('Auth store: Successfully restored user session:', user.value?.username);
        
        // Sync with ability store
        const abilityStore = useAbilityStore();
        abilityStore.updateAbility(user.value);
      } catch (error) {
        console.error('Auth store: Failed to parse stored user:', error);
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    } else {
      console.log('Auth store: No valid session found in localStorage');
    }
  }
  const login = async () => {
    try {
      const response = await loginApi(credentials);
      const data = response.data.data;
      console.log("data", data);
      user.value = data.user;
      console.log(user.value);
      tokens.value = { accessToken: data.access_token, refreshToken: data.refresh_token };
      isAuthenticated.value = true;
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user",JSON.stringify(data.user))
      localStorage.setItem("accessToken", data.access_token);
      
      // Sync with ability store
      const abilityStore = useAbilityStore();
      abilityStore.updateAbility(data.user);
    
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async () => {
    try {
      const response = await registerApi(form);
      const data = response.data.data;
      user.value = data.user;
      tokens.value = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
      isAuthenticated.value = true;
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Sync with ability store
      const abilityStore = useAbilityStore();
      abilityStore.updateAbility(data.user);
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  };
  
  const logout = () => {
    user.value = null;
    tokens.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    
    // Sync with ability store
    const abilityStore = useAbilityStore();
    abilityStore.updateAbility(null);
  };

  return {
    credentials,
    form,
    user,
    tokens,
    isAuthenticated,
    login,
    register,
    logout,
    init
  };
});
