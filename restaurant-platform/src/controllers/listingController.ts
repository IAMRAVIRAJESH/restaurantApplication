import { Request, Response } from 'express';
import Listing from '../models/listing';

export const createListing = async (req: Request, res: Response) => {
  const { name, phone, city, address, images } = req.body;
  const ownerId = req.user?.id; // Assuming req.user is populated by the authentication middleware
  try {
    const listing = new Listing({ name, phone, city, address, images, ownerId });
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllListings = async (_req: Request, res: Response) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
