import { useParams } from "react-router-dom";
import { getUserById } from "../api/user";
import Card from "../components/Card";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTelegram,
  faTwitter,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { QRCode } from "react-qrcode-logo";
import Logo from "../assets/logo.jpg";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
import "./PersonalCard.css";

const PersonalCard = () => {
  const userId = useParams().id;
  const cardRef = useRef(null);
  const getUser = async () => {
    const user = await getUserById(userId);
    if (user) {
      return user;
    }
    return null;
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser().then((user) => {
      setUser(user.user);
    });
  }, []);

  // const { toPDF, targetRef } = usePDF({ filename: "card.pdf" });
  const handleDownload = async (e) => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    e.target.style.display = "none";
    window.print();
    e.target.style.display = "block";
  };
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-40px*2)] flex-col">
      <div className="py-20 px-5" ref={cardRef}>
        <Card className="p-5 relative">
          <img
            src={user?.avatar}
            className="w-32 h-32 rounded-full object-cover absolute left-1/2 -translate-1/2 top-0"
          />
          <div className="pt-[calc(128px/2)] text-center w-full">
            <h1 className="font-extrabold text-xl">
              {user?.firstName} {user?.lastName}
            </h1>
            <h2 className="font-semibold text-gray-400 text-sm">
              #{user?.username}
            </h2>
            <div className="flex justify-center mt-3">
              <QRCode
                value={window.location.href}
                size={250}
                ecLevel="H"
                qrStyle="dots"
                eyeRadius={50}
                // includeMargin={false}
                logoImage={Logo}
                logoWidth={70}
                quietZone={20}
                removeQrCodeBehindLogo={true}
                // bgColor="#FFFFFF"
                fgColor="#2c3b51"
                style={{ borderRadius: "10px" }}
              />
            </div>
            <p className="font-semibold text-gray-200 text-sm mt-3">
              {user?.bio}
            </p>
            <div className="flex justify-center items-center mt-2 gap-5">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-gray-300 text-sm">
                  PKS {user?.rule}
                </p>
                <p className="font-semibold text-gray-400 text-sm">
                  Vist My Social Media
                </p>
                <ul className="flex gap-1 justify-center">
                  {user?.socialMedia?.facebook && (
                    <li className="font-semibold text-gray-400 text-sm">
                      <a
                        href={"https://" + user?.socialMedia?.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          className="text-md"
                          icon={faFacebook}
                        />
                      </a>
                    </li>
                  )}
                  {user?.socialMedia?.instagram && (
                    <li className="font-semibold text-gray-400 text-sm">
                      <a
                        href={user?.socialMedia?.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          className="text-md"
                          icon={faInstagram}
                        />
                      </a>
                    </li>
                  )}
                  {user?.socialMedia?.x && (
                    <li className="font-semibold text-gray-400 text-sm">
                      <a
                        href={user?.socialMedia?.x}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          className="text-md"
                          icon={faXTwitter}
                        />
                      </a>
                    </li>
                  )}
                  {user?.socialMedia?.telegram && (
                    <li className="font-semibold text-gray-400 text-sm">
                      <a
                        href={user?.socialMedia?.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          className="text-md"
                          icon={faTelegram}
                        />
                      </a>
                    </li>
                  )}
                  {user?.socialMedia?.linkedin && (
                    <li className="font-semibold text-gray-400 text-sm">
                      <a
                        href={user?.socialMedia?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          className="text-md"
                          icon={faLinkedin}
                        />
                      </a>
                    </li>
                  )}
                  {user?.socialMedia?.github && (
                    <li className="font-semibold text-gray-400 text-sm">
                      <a
                        href={user?.socialMedia?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon className="text-md" icon={faGithub} />
                      </a>
                    </li>
                  )}
                  {user?.socialMedia?.twitter && (
                    <li className="font-semibold text-gray-400 text-sm">
                      <a
                        href={user?.socialMedia?.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon className="text-md" icon={faTwitter} />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <button
        className="bg-blue-600 px-10 py-3 rounded-2xl hover:bg-blue-800"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
};

export default PersonalCard;
