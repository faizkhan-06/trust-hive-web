"use client"
import reviewStore from '@/stores/ReviewStore'
import userStore from '@/stores/UserStore';
import { IReview } from '@/types';
import React, { useEffect, useState } from 'react'


const ReviewsContainer = () => {
  const [reviews, setReviews] = useState<IReview>();
  const fetchAllReviews = async (page?: number, limit?: number) => {
    try {
      const resp = await reviewStore.fetchAllReviews(userStore.user?.business.slug ?? "", page, limit);
      if (resp.success) {
        setReviews(resp.data.reviews);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllReviews();
  }, [])

  return (
    <div>ReviewsContainer</div>
  )
}

export default ReviewsContainer