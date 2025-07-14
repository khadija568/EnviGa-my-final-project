import Waste from "../models/Waste.js";

// إرسال كمية نفايات جديدة
export const createSubmission = async (req, res) => {
  const { weight, date } = req.body;
  const hotelId = req.user.id; // من auth
  const submission = await Waste.create({ hotel: hotelId, weight, date });
  res.status(201).json(submission);
};

// جلب كل التسليمات للفندق
export const getSubmissions = async (req, res) => {
  const hotelId = req.user.id;
  const subs = await Waste.find({ hotel: hotelId }).sort('-date');
  res.json(subs);
};

// [1] جلب كل الطلبات مع بيانات الفندق
export const getAllWasteRequests = async (req, res) => {
  try {
    const requests = await Waste.find().populate('hotel', 'name address').sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch waste requests" });
  }
};

// [2] تحديث حالة طلب
export const updateWasteStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'accepted', 'picked_up'].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const waste = await Waste.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('hotel', 'name address');

    if (!waste) return res.status(404).json({ error: "Request not found" });

    res.json(waste);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};

// جلب كل الطلبات الخاصة بفندق معيّن
export const getWasteByHotelId = async (req, res) => {
  const hotelId = req.user.id; // من query مثلاً
  console.log("hotelID received from client:", hotelId);
  if (!hotelId) {
    return res.status(400).json({ error: "Hotel ID is required" });
  }

  try {
    const requests = await Waste.find({ hotel: hotelId }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel's waste requests" });
  }
};

//delete waste from association
export const deleteWasteById = async (req, res) => {
  try {
    await Waste.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete waste" });
  }
};