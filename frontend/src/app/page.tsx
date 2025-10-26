import Feed from "@/components/layouts/feed/Feed";
import Nav from "@/components/layouts/navigation/Nav";
import Storyitems from "@/components/layouts/storyitems/Storyitems";
import UploadBox from "@/components/layouts/uploadbox/UploadBox";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-background-secondary">
      <div className="flex Pagearea  min-h-screen gap-6 xl:gap-6 2xl:gap-6 ">
        {/* Left Sidebar */}
        <nav className=" w-[40%] xl:w-[27%] hidden lg:block bg-background  sticky top-[90px]  h-[calc(100vh_-_90px)] rounded-t-lg  py-4 px-2 ">
          amar nav left
        </nav>

        {/* Main Content */}
        <div className="flex-1 w-full lg:w-[44%] mt-2 md:mt-4  ">
          <Storyitems />
          <UploadBox />
          <Feed />
        </div>

        {/* Right Sidebar */}
        <nav className="w-[27%]  hidden xl:block  bg-background  sticky  top-[90px]  h-[calc(100vh_-_90px)] rounded-t-lg py-4 px-2 ">
          right side nav
        </nav>
      </div>
    </main>
  );
}
