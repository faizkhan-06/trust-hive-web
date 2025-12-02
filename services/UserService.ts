import useHttp from "@/hooks/useHttp"

const {httpPost}  = useHttp();

class UserService {
  async Login(email: string, password: string){
    const resp = await httpPost("login",{email, password}); 
    return resp;
  }

  async Register(email: string, password: string, businessName: string, businessType: string){
    const resp = await httpPost("register", {email, password, business_name: businessName, business_type: businessType});
    return resp;
  }
}

export default UserService