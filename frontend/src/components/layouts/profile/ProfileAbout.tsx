import React from "react";
import {
  FaGraduationCap,
  FaBirthdayCake,
  FaHeart,
  FaHome,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { UserType } from "@/types/userType";

interface userProps {
  user: UserType; // incoming profile owner userId
}

const ProfileAbout: React.FC<userProps> = ({ user }) => {
  const hasAnyProfileInfo = [
    user.educations?.[0],
    user.work?.[0],
    user.location?.trim(),
  ].some(Boolean);

  if (hasAnyProfileInfo)
    return (
      <div className="flex flex-col gap-6 px-6 lg:px-12 py-6 bg-background rounded-md w-full">
        {/* About Section Title */}
        <h2 className="text-lg font-bold text-loose">About</h2>

        {/* User Details */}
        <div className="flex flex-col gap-3 2xl:gap-4 text-secondary text-sm">
          {/* Education */}
          {user.educations?.[0] && (
            <div className="flex items-start gap-1">
              <FaGraduationCap className="text-lg w-7.5 shrink-0" />
              <span>
                Studied at{" "}
                <span className="font-semibold">{user.educations}</span>
              </span>
            </div>
          )}

          {/* Work  */}
          {user?.work?.[0] && (
            <div className="flex items-start gap-1">
              <MdWork className="text-lg w-7.5 shrink-0" />
              <span>
                Working at <span className="font-semibold">{user.work}</span>
              </span>
            </div>
          )}

          {/* Date of Birth */}
          {user.dateOfBirth && (
            <div className="flex items-start gap-1">
              <FaBirthdayCake className="text-lg w-7.5 shrink-0" />
              <span>
                Born on{" "}
                <span className="font-semibold">{user.dateOfBirth}</span>
              </span>
            </div>
          )}

          {/* Relationship Status */}
          {user.gender && (
            <div className="flex items-start gap-1">
              <FaHeart className="text-lg w-7.5 shrink-0" />
              <span>
                I'm <span className="font-semibold">{user.gender}</span>
              </span>
            </div>
          )}

          {/* Current Location */}
          {user?.location && (
            <div className="flex items-start gap-1">
              <FaHome className="text-lg w-7.5 shrink-0" />
              <span>
                Lives in Now{" "}
                <span className="font-semibold">{user?.location}</span>
              </span>
            </div>
          )}
          {/* Social Links */}
          <div className="flex items-center gap-3 mt-2">
            <span className="font-bold">Social Links:</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-lg " />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-lg " />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-lg " />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-lg " />
            </a>
          </div>
        </div>
      </div>
    );
  else return null;
};

export default ProfileAbout;
