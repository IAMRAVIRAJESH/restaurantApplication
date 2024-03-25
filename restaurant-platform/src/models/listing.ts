import mongoose from 'mongoose';

interface Listing {
  owner: mongoose.Schema.Types.ObjectId;
  listingName: string;
  businessPhone: string;
  city: string;
  address: string;
  images: string[];
}

const listingSchema = new mongoose.Schema<Listing>({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingName: { type: String, required: true },
  businessPhone: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  images: [{ type: String }]
});

const Listing = mongoose.model<Listing>('Listing', listingSchema);

export default Listing;