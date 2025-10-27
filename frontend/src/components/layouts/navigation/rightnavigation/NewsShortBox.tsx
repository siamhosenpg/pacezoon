import React from "react";

const NewsData = [
  {
    newstitle:
      "Breaking News: Market Hits All-Time Highs Amids Economic Chance of Showers in the Afternoon.",
  },
  {
    newstitle:
      "Tech Giants Announce New Collaboration on AI Research to Drive Innovation.",
  },
  {
    newstitle:
      "Local Community Rallies to Support Small Businesses During Holiday Season.",
  },
  {
    newstitle: "Health Officials Urge Vaccinations as Flu Season Approaches.",
  },
  {
    newstitle:
      "Sports Update: Underdog Team Clinches Championship in Thrilling Overtime Victory.",
  },
];
const NewsShortBox = () => {
  return (
    <div className="News px-5 py-4 mt-3 bg-background rounded-lg">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <div className="font-bold text-primary">News</div>
        <div className="text-sm text-secondary">Show more</div>
      </div>
      <ul>
        {NewsData.map((item, index) => {
          return (
            <li key={index} className="">
              <div className="block font-medium text-primary mt-5 text-sm">
                {item.newstitle}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewsShortBox;
