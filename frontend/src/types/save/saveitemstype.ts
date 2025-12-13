// ================================
// Saved Item Main Type
// ================================
export interface SavedItemType {
  _id: string;
  collectionId: string;
  userId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

// ================================
// API Response Types
// ================================

// Save Post Response -> savePost()
export interface SavePostResponse {
  success: boolean;
  message: string;
  item: SavedItemType;
}

// Get Saved Items Response -> getSavedItems()
export interface GetSavedItemsResponse {
  success: boolean;
  items: SavedItemType[];
}

// Delete Saved Item Response -> deleteSavedItem()
export interface DeleteSavedResponse {
  success: boolean;
  message: string;
}

// Check if a post is saved -> checkIfPostSaved()
export interface CheckSavedResponse {
  saved: boolean;
  itemId?: string; // যদি পোস্ট সেভ করা থাকে
}
