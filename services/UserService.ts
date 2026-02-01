import useHttp from "@/hooks/useHttp"

const {httpPost, httpPatch}  = useHttp();

class UserService {
  async Login(email: string, password: string){
    const resp = await httpPost("login",{email, password}); 
    return resp;
  }

  async Register(email: string, password: string, businessName: string, businessType: string){
    const resp = await httpPost("register", {email, password, business_name: businessName, business_type: businessType});
    return resp;
  }

  async UpdateBusiness(name: string, type: string) {
    const resp = await httpPatch("business", {name, type});
    return resp;
  }

  async ChangePassword(old_password: string, new_password: string){
    const resp = await httpPatch("user/change-password", {old_password, new_password});
    return resp;
  }
}

export default UserService