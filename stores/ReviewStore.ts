import ReviewService from "@/services/ReviewService";
import { ApiResponse } from "@/types";


class ReviewStore {
  constructor(private _reviewService: ReviewService){}

  async fetchAllReviews(businessSlug: string, page?: number, limit?: number){
    const resp = await this._reviewService.fetchAllReviews(businessSlug,page, limit) as ApiResponse;
    return resp;
  }
}

const reviewStore = new ReviewStore(new ReviewService());
export default reviewStore