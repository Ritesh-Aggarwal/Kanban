import React from "react";
import Modal from "./Modal";

export function LoadingDots() {
  const circleCommonClasses = "h-3 w-3 bg-current   rounded-full";
  return (
    <div className="flex">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
}

const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading ? (
        <Modal open={loading} closeCB={() => {}}>
          <div className="w-full flex items-center justify-around">
            <LoadingDots />
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Loader;
