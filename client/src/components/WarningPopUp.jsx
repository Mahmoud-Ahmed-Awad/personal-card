const WarningPopUp = ({
  message,
  onYes,
  onNo,
  onClose,
  visible,
  yesText,
  noText,
}) => {
  return (
    <div
      className={`${
        visible ? "block" : "hidden"
      } fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden w-full h-full`}
    >
      <div
        id="popup-modal"
        tabIndex="-1"
        className="overflow-y-auto overflow-x-hidden z-50 justify-center items-center"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative rounded-lg shadow-sm bg-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
            >
              <svg
                className="w-3 h-3"
                // aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 w-12 h-12 text-gray-200"
                // aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-400">
                {message}
              </h3>
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={onYes}
              >
                {yesText}
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
                onClick={onNo}
              >
                {noText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 z-40 bg-black opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default WarningPopUp;
