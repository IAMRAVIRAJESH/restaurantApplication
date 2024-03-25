import express from 'express';
import { createListing, getAllListings, getListing, updateListing, deleteListing } from '../controllers/listingController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createListing);
router.get('/', authenticateToken, getAllListings);
router.get('/:id', authenticateToken, getListing);
router.put('/:id', authenticateToken, updateListing);
router.delete('/:id', authenticateToken, deleteListing);

export default router;