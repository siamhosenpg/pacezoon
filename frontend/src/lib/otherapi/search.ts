import axiosInstance from "../axios";

export interface UserType {
  _id: string;
  userid?: number;
  name: string;
  username: string;
  profileImage: string;
}

export interface PostContentType {
  caption: string;
  media: string[];
  type: string;
  location?: string;
  tags?: string[];
  mentions?: string[];
}

export interface PostType {
  _id: string;
  userid: UserType;
  content: PostContentType;
  createdAt: string;
}

export interface SearchResponse {
  success: boolean;
  users: UserType[];
  posts: PostType[];
}

export const fetchGlobalSearch = async (
  query: string
): Promise<SearchResponse> => {
  const { data } = await axiosInstance.get<SearchResponse>(
    `/search/search?q=${encodeURIComponent(query)}`
  );
  return data;
};
