/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

type MenuItem = {
  label: string;
  onClick: () => void;
};

interface Props {
  menu: MenuItem[];
  menuButton: React.ReactNode;
}

export default function Dropdown(props: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex justify-center items-center w-full text-sm font-medium text-gray-700 ">
        {props.menuButton}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {props.menu.map((item, idx) => {
              return (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <button
                      onClick={item.onClick}
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } 
                    block px-4 py-2 text-sm w-full text-left`}
                    >
                      {item.label}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
