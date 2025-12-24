export interface LoginHistory {
  ip: string;
  device: string;
  location: string;
  loginAt: string; // ISO date string
}

export interface NotificationSettings {
  likes: boolean;
  comments: boolean;
  follows: boolean;
  mentions: boolean;
  messages: boolean;
}

export interface PrivacySettings {
  showEmail: boolean;
  showPhone: boolean;
  allowTagging: boolean;
  allowMessagesFrom: "everyone" | "followers" | "no_one";
}

export interface UserSettings {
  theme: "light" | "dark";
  language: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface SecurityInfo {
  twoFactorAuth: boolean;
  lastPasswordChange: string; // ISO date string
  loginHistory: LoginHistory[];
}

export interface ActivityStats {
  totalPosts: number;
  totalLikesGiven: number;
  totalLikesReceived: number;
  totalComments: number;
  totalFollowers: number;
  totalFollowing: number;
}

export interface UserPreferences {
  contentVisibility: "public" | "private" | "friends";
  autoPlayVideos: boolean;
}

export interface UserType {
  _id: string;
  userid: number;
  username: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  location?: string;
  website?: string;
  phone?: string;
  work?: string;
  educations?: string;
  aboutText?: string;
  // 👇 important for TS
  profileImage?: string | File;
  coverImage?: string | File;

  blockedUsers: string[]; // array of Mongo ObjectId strings

  accountType: "public" | "private";
  verified: boolean;
  status: "active" | "disabled" | "banned";
  role: "user" | "admin" | "moderator";

  settings: UserSettings;
  security: SecurityInfo;
  preferences: UserPreferences;

  badges: string[];

  activityStats: ActivityStats;

  joinedAt: string;
  lastActive: string;
}
