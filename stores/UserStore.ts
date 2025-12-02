import { CMI_TOKEN } from "@/configs/constants";
import useCookie from "@/hooks/useCookie";
import { ApiResponse, IUser } from "@/types";
import { makeAutoObservable, remove } from "mobx";
import { makePersistable } from "mobx-persist-store";
import Cookies from 'js-cookie';
import UserService from "@/services/UserService";

class UserStore {
  user: IUser | undefined = undefined;

  constructor(private _userService: UserService) {
    makeAutoObservable(this);

    if (typeof window !== 'undefined') {
      makePersistable(this, {
        name: "UserStore",
        properties: ["user"],
        storage: window.localStorage,
      });
    }
  }

  setUser(user: IUser | undefined) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }


  async Login(email: string, password: string): Promise<ApiResponse>{
    const resp = await this._userService.Login(email, password) as ApiResponse;
    return resp;
  }

  async Register(email: string, password: string, businessName: string, businessType: string): Promise<ApiResponse>{
    const resp = await this._userService.Register(email, password, businessName, businessType) as ApiResponse;
    return resp;
  }


  logout() {
    Cookies.remove(CMI_TOKEN);
    this.setUser(undefined);; 
  }
}

const userStore = new UserStore(new UserService());

export default userStore;
