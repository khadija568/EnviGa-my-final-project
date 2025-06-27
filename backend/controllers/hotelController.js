import Hotel from '../models/hotelModel.js';

// Create
export const createHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    const savedHotel = await hotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création", error: err });
  }
};

// Read all
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

// Read one
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hôtel non trouvé" });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

// Update
export const updateHotel = async (req, res) => {
  try {
    const updated = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Hôtel non trouvé" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour", error: err });
  }
};

// Delete
export const deleteHotel = async (req, res) => {
  try {
    const deleted = await Hotel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Hôtel non trouvé" });
    res.json({ message: "Hôtel supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};
