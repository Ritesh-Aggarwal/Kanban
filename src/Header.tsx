import React from "react";
import { AuthConsumer as useAuth } from "./Auth/AuthContext";
import Dropdown from "./common/Dropdown";
import Loader from "./common/Loader";
import { logout as logoutUser } from "./utils/apiUtils";

type Props = {};

const ProfileIcon = () => {
  return (
    <div className="rounded-full h-8 w-8 bg-slate-200 text-gray-700 flex items-center justify-around">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

function ChevronIcon() {
  return (
    <div className="text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

function Header(props: Props) {
  const { logout, user } = useAuth();
  const menu = [
    // {
    //   label: "Profile",
    //   onClick: () => {
    //     console.log(user);
    //   },
    // },
    {
      label: "Logout",
      onClick: () => {
        logoutUser();
        logout();
      },
    },
  ];
  return (
    <div className="flex flex-row-reverse items-center p-2">
      <Loader loading={user.username === ""} />
      <div className="flex items-center justify-between">
        <ProfileIcon />
        <Dropdown menuButton={ChevronIcon} menu={menu} />
      </div>
      <div className="font-medium mr-2">{user.username}</div>
    </div>
  );
}

export default Header;
