
import express from 'express';
import { createReview, getAllReviews, getReview, updateReview, deleteReview } from '../controllers/reviewController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createReview);
router.get('/', authenticateToken, getAllReviews);
router.get('/:id', authenticateToken, getReview);
router.put('/:id', authenticateToken, updateReview);
router.delete('/:id', authenticateToken, deleteReview);

export default router;
