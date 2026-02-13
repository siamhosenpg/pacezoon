import { Suspense } from "react";

import Feed from "@/components/layouts/feed/Feed";
import ProfileStatusBox from "@/components/layouts/navigation/leftnavigation/Profilestatusbox";
import ShortcutActivity from "@/components/layouts/navigation/leftnavigation/ShortcutActivity";
import Submeunssection from "@/components/layouts/navigation/leftnavigation/Submeunssection";
import NewsShortBox from "@/components/layouts/navigation/rightnavigation/NewsShortBox";
import SuggestAccounts from "@/components/layouts/navigation/rightnavigation/SuggestAccounts";
import Storys from "@/components/layouts/storyitems/Storys";
import UploadBox from "@/components/layouts/uploadbox/UploadBox";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";

export const metadata = {
  title:
    "Prosongo – A Full-Stack Social Media Web App Inspired by Facebook & Instagram",
  description:
    "Prosongo is a professional full-stack social media app built with Next.js, Node.js, Express.js, and MongoDB. Users can signup/login, create and manage posts, react with multiple emojis, comment, reply, and share content. The app features a responsive, modern UI inspired by Facebook and Instagram, ensuring smooth user experience across devices. All data is securely stored in MongoDB for scalability and reliability. Prosongo showcases modern frontend and backend development practices, making it an ideal reference for developers or a foundation for production-ready social platforms.",
};

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <span className="font-bold text-5xl ">Prosongo</span>
        </div>
      }
    >
      <ProtectedRoute>
        <main className="bg-background-secondary ">
          <div className="flex Pagearea  min-h-screen gap-6 xl:gap-6 2xl:gap-6 ">
            {/* Left Sidebar */}
            <nav className=" w-[40%] xl:w-[27%] hidden lg:block  sticky top-22.5  h-[calc(100vh-90px)] rounded-t-lg  ">
              <div className="w-full  overflow-y-hidden hover:overflow-y-scroll h-full  ScrollSystem  ">
                <ProfileStatusBox />
                <Submeunssection />
                <ShortcutActivity />
              </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 w-full lg:w-[44%] mt-2 md:mt-4  ">
              <Storys />
              <UploadBox />
              <Feed />
            </div>

            {/* Right Sidebar */}
            <nav className="w-[27%]  hidden xl:block    sticky  top-22.5  h-[calc(100vh-90px)] rounded-t-lg  ">
              <div className="  overflow-y-hidden hover:overflow-y-scroll ScrollSystem w-full h-full  ">
                <SuggestAccounts />
                <NewsShortBox />
              </div>
            </nav>
          </div>
        </main>
      </ProtectedRoute>
    </Suspense>
  );
}
