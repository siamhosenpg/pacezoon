import axiosInstance from "../axios";

// Save post (auto default or given collection)
export const savePost = async (postId, collectionId = "default") => {
  const res = await axiosInstance.post(`/items/item/${collectionId}`, {
    postId,
  });
  return res.data;
};

// Get all saved items of a folder
export const getSavedItems = async (collectionId) => {
  const res = await axiosInstance.get(`/items/item/${collectionId}`);
  return res.data;
};

// Delete saved item
export const deleteSavedItem = async (itemId) => {
  const res = await axiosInstance.delete(`/items/item/delete/${itemId}`);
  return res.data;
};

export const checkIfPostSaved = async (postId) => {
  const res = await axiosInstance.get(`/items/check/${postId}`);
  return res.data; // { saved: true/false }
};
