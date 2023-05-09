import React from "react";
import { BeatLoader } from "react-spinners";
interface InterfaceLoader {
  loading: Boolean;
  screenSize?: string;
}
function Loader({ loading, screenSize = "fixed" }: InterfaceLoader) {
  return (
    <div>
      {loading && (
        <>
          <div
            className={`${screenSize} top-0 left-0 z-50 w-full h-full bg-black opacity-50 ease-out duration-300`}
          >
            <div className=' relative z-50 h-full w-full flex items-center justify-center'>
              <BeatLoader color='#ffffff' loading speedMultiplier={1} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Loader;
