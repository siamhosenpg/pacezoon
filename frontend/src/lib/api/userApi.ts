import axiosInstance from "../axios";
import { UserType } from "@/types/userType";

// 🟢 Update current user's profile (TEXT + IMAGE)
export const updateUserProfile = async (data: UserType) => {
  try {
    const formData = new FormData();

    // 🧠 Append text fields (except profileImage & coverImage)
    (
      Object.entries(data) as [keyof UserType, UserType[keyof UserType]][]
    ).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        key !== "profileImage" &&
        key !== "coverImage"
      ) {
        formData.append(key, String(value));
      }
    });

    // 🖼 Append image files
    if (data.profileImage instanceof File) {
      formData.append("profileImage", data.profileImage);
    }
    if (data.coverImage instanceof File) {
      formData.append("coverImage", data.coverImage);
    }

    // ⚠️ Axios PUT request with multipart/form-data
    const res = await axiosInstance.put(
      `/users/user/${data.userid}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error("Update profile error:", error);
    throw error;
  }
};

// 🟢 Get current user profile
export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data.user;
};
