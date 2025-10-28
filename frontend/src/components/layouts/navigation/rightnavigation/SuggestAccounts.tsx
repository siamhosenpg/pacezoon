import React from "react";

const userData = [
  {
    name: "Nazirana Nahar",
    username: "nazirana99",
    profileimage: "/profile/4.jpg",
  },
  {
    name: "Masud Sowadogor",
    username: "masudsowadogor",
    profileimage: "/profile/3.jpg",
  },
  {
    name: "Shium Hossen",
    username: "shiumhossen99",
    profileimage: "/profile/2.jpg",
  },
  {
    name: "Arafat Hossen",
    username: "arafathossen",
    profileimage: "/profile/1.jpg",
  },
  {
    name: "Rakibul Islam",
    username: "Rakibul99",
    profileimage: "/profile/5.jpg",
  },
  {
    name: "Sakib Al Hasan",
    username: "sakibhasan",
    profileimage: "/profile/6.jpg",
  },
];
const SuggestAccounts = () => {
  return (
    <div className="Suggested  p-3  bg-background rounded-lg">
      <div className="flex items-center text-primary p-3 justify-between border-b border-border">
        <b>Suggested</b>
        <button className="text-sm text-secondary">See all</button>
      </div>
      <ul className="mt-3">
        {userData &&
          userData.map((user, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between mb-1 hover:bg-background px-3 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src="/images/profile.jpg"
                    alt=""
                  />
                  <div className="text">
                    <b className="block text-sm font-semibold text-primary">
                      {user.name}
                    </b>
                    <span className="block text-sm text-secondary">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <button className="text-sm text-accent font-semibold border-accent border-[1px] py-1 px-3 rounded-md">
                  Follow
                </button>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default SuggestAccounts;
