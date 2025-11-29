import Feed from "@/components/layouts/feed/Feed";
import ProfileFeed from "@/components/layouts/feed/ProfileFeed";
import ProfileAbout from "@/components/layouts/profile/ProfileAbout";
import ProfileFollower from "@/components/layouts/profile/ProfileFollower";
import ProfilePhotoslist from "@/components/layouts/profile/ProfilePhotoslist";
import ProfileSectionlist from "@/components/layouts/profile/ProfileSectionlist";
import ProfileTopimage from "@/components/layouts/profile/ProfileTopimage";
import ProfileVideos from "@/components/layouts/profile/ProfileVideos";
import UploadBox from "@/components/layouts/uploadbox/UploadBox";

import { getUserByUserid } from "@/lib/user/userData";

interface ProfilePageProps {
  params: {
    userid: string;
  };
}

const Profile = async ({ params }: ProfilePageProps) => {
  const userid = Number(params.userid);

  const user = await getUserByUserid(userid);

  if (!user) {
    return <div className="text-center mt-10">User not found</div>;
  }

  return (
    <div className="bg-background-secondary">
      <div className="Pagearea">
        <div className="pt-0 md:pt-4 flex flex-col lg:flex-row gap-6 items-start justify-between overflow-visible">
          {/* LEFT SIDE */}
          <div className="w-full lg:w-7/12 static lg:sticky space-y-4">
            <ProfileTopimage user={user} />
            <ProfileSectionlist />
            <ProfileAbout />
            <ProfileFollower />
            <ProfilePhotoslist />
            <ProfileVideos />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 w-full lg:w-5/12">
            <UploadBox />

            <ul className="mt-4">
              <div>
                <ProfileFeed useridcall={user._id} />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
