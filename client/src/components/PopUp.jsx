const PopUp = ({
  title,
  message,
  onAccept,
  onDecline,
  acceptText = "Accept",
  declineText = "Decline",
  onClose,
  visible,
  children,
}) => {
  return (
    <div
      className={`${
        visible ? "block" : "hidden"
      } fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden w-full h-full top-0 left-0`}
    >
      <div
        id="default-modal"
        tabIndex="-1"
        // aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden z-50 justify-center items-center min-w-1/3"
      >
        {/* <!-- Modal content --> */}
        <div className="relative p-4 min-w-full max-w-2xl min-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg shadow-sm bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                onClick={onClose}
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
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-400">
                {message}
              </p>
              {children}
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 border-t rounded-b border-gray-600">
              <button
                type="button"
                className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                onClick={onAccept}
              >
                {acceptText}
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
                onClick={onDecline}
              >
                {declineText}
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

export default PopUp;
