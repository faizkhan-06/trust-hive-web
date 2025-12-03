

export interface IUser {
  id: string;
  email: string;
  business: IBusiness;
}

export interface IBusiness {
  id: string;
  name: string;
  slug: string;
  type: string;
  user_id: string;
}

export type ApiError = {
  code: number;
  file: string;
  line: string;
  message: string;
  url: string;
};

export type ApiResponse = {
  message: string;
  success: boolean;
  data: any; //Declare Type after getting response
};

export interface IReview {
  id: string;
  rating: number;
  review_text: string;
  business_id: string;
  reviewer_name: string;
  created_at: Date;
}


export interface IApiReviewData {
  reviews: IReview[];
  total: number; 
  page: number;
  limit: number;
  totalPages: number; 
}