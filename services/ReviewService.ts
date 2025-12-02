import useHttp from "@/hooks/useHttp"

const {httpGet} = useHttp();

class ReviewService {
  async fetchAllReviews(businessSlug: string, page?: number, limit?: number){
    const resp = await httpGet(`reviews/${businessSlug}`, {page, limit});
    return resp;
  }
}

export default ReviewService