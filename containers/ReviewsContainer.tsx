"use client"
import React, { useEffect, useState, useMemo } from 'react'
import reviewStore from '@/stores/ReviewStore'
import userStore from '@/stores/UserStore';
import { ChevronLeft, ChevronRight, Star, User, MessageSquare } from 'lucide-react';
import moment from 'moment';
import { IApiReviewData, IReview } from '@/types';

const REVIEWS_PER_PAGE = 18;

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`w-3.5 h-3.5 transition-colors ${i < fullStars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
      />
    );
  }
  return <div className="flex space-x-0.5">{stars}</div>;
};

const ReviewCard: React.FC<{ review: IReview }> = ({ review }) => {
  const formattedDate = useMemo(
    () => moment(review.created_at).format("MMM Do, YYYY"),
    [review.created_at]
  );

  return (
    <div className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">
            {review.reviewer_name}
          </h3>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>
        <StarRating rating={review.rating} />
      </div>

      <p className="text-gray-700 text-sm mt-3 leading-relaxed">
        {review.review_text}
      </p>
    </div>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex justify-center items-center space-x-2 mt-8 font-inter">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-primary/10 rounded-lg text-primary hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 shadow-sm"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex space-x-1 mx-1">
        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1.5 cursor-pointer rounded-lg text-sm font-semibold transition duration-300 shadow-sm ${page === currentPage
                  ? 'bg-primary text-white shadow-primary/50'
                  : 'text-gray-700 hover:bg-primary/10 hover:text-primary bg-white border border-gray-200'
                }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-3 py-1.5 text-gray-500 flex items-center">
              {page}
            </span>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-primary/20 rounded-lg text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 shadow-sm"
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

const ReviewsContainer = () => {
  // 1. Separate state for the data from the API response (current page's reviews)
  const [currentReviews, setCurrentReviews] = useState<IReview[]>([]);
  // 2. Separate state for the page number
  const [currentPage, setCurrentPage] = useState(1);
  // 3. Persistent state for the TOTAL number of reviews (THIS IS THE KEY FIX)
  const [totalReviewsCount, setTotalReviewsCount] = useState<number>(0);
  // 4. Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total pages based on the persistent count
  const totalPages = Math.ceil(totalReviewsCount / REVIEWS_PER_PAGE);

  // The reviews to display are just the ones fetched for the current page
  const displayedReviews = currentReviews;


  const fetchReviews = async (page: number = 1, limit: number = REVIEWS_PER_PAGE) => {
    setIsLoading(true);
    try {
      const resp: { success: boolean; data: IApiReviewData } = await reviewStore.fetchAllReviews(
        userStore.user?.business.slug ?? "",
        page,
        limit
      );

      if (resp.success && resp.data.reviews) {
        // A. Update the current page's reviews and page number
        setCurrentReviews(resp.data.reviews);
        setCurrentPage(page);

        // B. Set the TOTAL count permanently on the first fetch
        if (resp.data.total >= 0) {
          setTotalReviewsCount(resp.data.total);
        }
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews(1, REVIEWS_PER_PAGE);
  }, [])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchReviews(page, REVIEWS_PER_PAGE);
    }
  };

  if (isLoading && totalReviewsCount === 0) {
    const ShimmerCards = [...Array(REVIEWS_PER_PAGE)].map((_, i) => (
      <div key={i} className="bg-white p-5 rounded-xl shadow-md border border-gray-100 animate-pulse h-40">
        <div className="flex justify-between mb-3">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-100 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
      </div>
    ));

    return (
      <div className="p-4 sm:p-8 lg:p-12 min-h-screen bg-linear-to-br from-primary/10 to-white">
        <header className="mb-8 text-center">
          <div className="h-4 bg-primary/20 rounded w-1/3 mx-auto mb-2 animate-pulse"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mt-2 animate-pulse"></div>
          <div className="w-12 h-1 bg-primary/30 mx-auto mt-3 rounded-full animate-pulse"></div>
        </header>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {ShimmerCards}
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (totalReviewsCount === 0 && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-12 bg-white rounded-xl shadow-lg border border-gray-100 m-8">
        <MessageSquare className="w-12 h-12 text-primary/40 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Be the first to leave a review!</h2>
        <p className="text-gray-500">No reviews found for this business yet.</p>
      </div>
    );
  }

  const isFetchingNextPage = isLoading && totalReviewsCount > 0;


  return (
    <div className="p-6">
      <div className="">

        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Reviews ({totalReviewsCount})
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            What customers are saying
          </p>
        </header>

        {/* Reviews Grid */}
        <div
          className={`transition-opacity duration-200 ${isFetchingNextPage ? "opacity-50 pointer-events-none" : ""
            }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {displayedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Loader while changing pages */}
        {isFetchingNextPage && (
          <div className="flex justify-center mt-4 mb-2">
            <svg
              className="animate-spin h-6 w-6 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );

}

export default ReviewsContainer