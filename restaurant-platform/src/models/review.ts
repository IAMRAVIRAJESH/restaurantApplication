import mongoose from 'mongoose';

interface Review {
  listing: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new mongoose.Schema<Review>({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

const Review = mongoose.model<Review>('Review', reviewSchema);

export default Review;