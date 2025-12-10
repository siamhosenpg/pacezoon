// controllers/savedCollection.controller.js
import SavedCollection from "../../models/savesystem/savedCollectionSchema.js";

/*
|--------------------------------------------------------------------------
| CREATE Folder
|--------------------------------------------------------------------------
*/
export const createCollection = async (req, res) => {
  try {
    const collection = await SavedCollection.create({
      userId: req.user._id,
      name: req.body.name,
      description: req.body.description || "",
    });

    res.status(201).json(collection);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Folder with this name already exists!" });
    }
    res.status(500).json({ error: err.message });
  }
};

/*
|--------------------------------------------------------------------------
| GET all collections of logged-in user
|--------------------------------------------------------------------------
*/
export const getCollections = async (req, res) => {
  try {
    const collections = await SavedCollection.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE Folder (only if owner)
|--------------------------------------------------------------------------
*/
export const updateCollection = async (req, res) => {
  try {
    const updated = await SavedCollection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // Only own folder
      { name: req.body.name, description: req.body.description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Folder not found!" });
    }

    res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Folder name already exists!" });
    }
    res.status(500).json({ error: err.message });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE Folder (only if owner)
|--------------------------------------------------------------------------
*/
export const deleteCollection = async (req, res) => {
  try {
    const deleted = await SavedCollection.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Folder not found!" });
    }

    res.json({ message: "Folder deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
|--------------------------------------------------------------------------
| GET Single Folder (for details page)
|--------------------------------------------------------------------------
*/
export const getSingleCollection = async (req, res) => {
  try {
    const folder = await SavedCollection.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found!" });
    }

    res.json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
