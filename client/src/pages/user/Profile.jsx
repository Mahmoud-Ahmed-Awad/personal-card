import { useSelector } from "react-redux";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../components/Input";
import { useState } from "react";
import WarningPopUp from "../../components/WarningPopUp";
import {
  deleteUserAvatar,
  updateUserAvatar,
  updateUserName,
  updateUserPassword,
  deleteUser,
  logoutUser,
  updateUserBio,
} from "../../api/user";
import PopUp from "../../components/PopUp";
import ImageInput from "../../components/ImageInput";
const Profile = () => {
  const user = useSelector((state) => state.user).value.user;
  const [deleteAvatarPopupVisible, setDeleteAvatarPopupVisible] =
    useState(false);
  const [changeAvatarPopupVisible, setChangeAvatarPopupVisible] =
    useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [changeNamePopupVisible, setChangeNamePopupVisible] = useState(false);
  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [newLastName, setNewLastName] = useState(user.lastName);
  const [changePasswordPopupVisible, setChangePasswordPopupVisible] =
    useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [deleteAccountPopupVisible, setDeleteAccountPopupVisible] =
    useState(false);
  const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);
  const [changeBioPopupVisible, setChangeBioPopupVisible] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const deleteAvatar = async () => {
    await deleteUserAvatar(); 
    setDeleteAvatarPopupVisible(false);
    window.location.reload();
  };
  const changeAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    await updateUserAvatar(formData);
    setChangeAvatarPopupVisible(false);
    window.location.reload();
  };
  const changeName = async () => {
    await updateUserName(newFirstName, newLastName);
    setChangeNamePopupVisible(false);
    window.location.reload();
  };
  const changePassword = async () => {
    if (newPassword !== newConfirmPassword) {
      setChangePasswordPopupVisible(false);
      return;
    }
    await updateUserPassword(currentPassword, newPassword, newConfirmPassword);
    setChangePasswordPopupVisible(false);
    window.location.reload();
  };
  const deleteAccount = async () => {
    await deleteUser();
    setDeleteAccountPopupVisible(false);
    window.location.reload();
  };
  const changeBio = async () => {
    await updateUserBio(bio);
    setChangeBioPopupVisible(false);
    window.location.reload();
  };
  return (
    // <div className="flex justify-center items-center min-h-dvh h-full bg-gradient-to-tr from-slate-950 to-slate-700 text-white p-10 flex-col">
    <Card className="p-7 w-fit justify-center">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-4xl font-bold">Profile</h1>
        <Card className="p-5 w-full justify-center flex items-center gap-4">
          {/* <Card.FirstPart className="flex items-center gap-4"> */}
          <img
            src={user.avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full object-fill"
          />
          <div>
            <h2 className="text-2xl font-extrabold">
              {user.firstName} {user.lastName}
            </h2>
            <h3 className="text-lg font-bold text-gray-300">
              <span className="font-bold">Username</span> {user.username}{" "}
              <button
                onClick={() => navigator.clipboard.writeText(user.username)}
                className="text-sm text-gray-400 hover:text-gray-300 transition-all duration-300 cursor-pointer"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </h3>
            <h4 className="text-sm text-gray-400">
              <span className="font-bold">Birth Date</span>{" "}
              {new Date(user.birthDate).toLocaleDateString()}
            </h4>
          </div>
        </Card>
        <Card className="p-5 w-full justify-center flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-extrabold">
                Change Profile Information
              </h1>
              <div className="w-full h-1 bg-gray-700"></div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold text-gray-300">
                Change Profile Avatar
              </h2>
              <p className="text-sm text-gray-400">
                Change your avatar to something more personal
              </p>
              <div className="flex flex-row gap-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                  onClick={() => setChangeAvatarPopupVisible(true)}
                >
                  Change Avatar
                </button>
                {changeAvatarPopupVisible && (
                  <PopUp
                    title="Change Avatar"
                    message="Please select an image to change your avatar"
                    children={
                      <ImageInput
                        onChange={(e) => setAvatarFile(e.target.files[0])}
                      />
                    }
                    onAccept={changeAvatar}
                    onDecline={() => setChangeAvatarPopupVisible(false)}
                    onClose={() => setChangeAvatarPopupVisible(false)}
                    acceptText="Change Avatar"
                    declineText="Cancel"
                    visible={changeAvatarPopupVisible}
                  />
                )}
                <button
                  className={`bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer ${
                    user.avatar.split("/").pop() === "default.jpg"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => setDeleteAvatarPopupVisible(true)}
                  disabled={user.avatar.split("/").pop() === "default.jpg"}
                >
                  Delete Avatar
                </button>
                {user.avatar.split("/").pop() !== "default.jpg" &&
                  deleteAvatarPopupVisible && (
                    <WarningPopUp
                      message="Are you sure you want to delete your avatar?"
                      onYes={deleteAvatar}
                      onNo={() => setDeleteAvatarPopupVisible(false)}
                      onClose={() => setDeleteAvatarPopupVisible(false)}
                      visible={deleteAvatarPopupVisible}
                      yesText="Yes"
                      noText="No"
                    />
                  )}
              </div>
              {/* <Card className="p-5 w-full justify-center flex items-center gap-4"> */}
              <div className="flex flex-col gap-2 w-full mt-3">
                <h2 className="text-lg font-bold text-gray-300">Change Name</h2>
                <p className="text-sm text-gray-400">
                  Change your name to something more personal
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer w-full"
                  onClick={() => setChangeNamePopupVisible(true)}
                >
                  Change Name
                </button>
                <PopUp
                  title="Change Name"
                  message="Please enter your new name"
                  children={
                    <form className="flex flex-row gap-2">
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        label="First Name"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                      />
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        label="Last Name"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                      />
                    </form>
                  }
                  onAccept={changeName}
                  onDecline={() => setChangeNamePopupVisible(false)}
                  onClose={() => setChangeNamePopupVisible(false)}
                  acceptText="Change Name"
                  declineText="Cancel"
                  visible={changeNamePopupVisible}
                />
              </div>
              <div className="flex flex-col gap-2 w-full mt-3">
                <h2 className="text-lg font-bold text-gray-300">Change Bio</h2>
                <p className="text-sm text-gray-400">
                  Change your bio to something more secure
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer w-full"
                  onClick={() => setChangeBioPopupVisible(true)}
                >
                  Change Bio
                </button>
                <PopUp
                  title="Change Bio"
                  message="Please enter your new bio"
                  children={
                    <form className="flex flex-col gap-2">
                      <Input
                        type="text"
                        name="bio"
                        id="bio"
                        label="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </form>
                  }
                  onAccept={changeBio}
                  onDecline={() => setChangeBioPopupVisible(false)}
                  onClose={() => setChangeBioPopupVisible(false)}
                  acceptText="Change Bio"
                  declineText="Cancel"
                  visible={changeBioPopupVisible}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full mt-3">
              <h2 className="text-lg font-bold text-gray-300">
                Change Password
              </h2>
              <p className="text-sm text-gray-400">
                Change your password to something more secure
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer w-full"
                onClick={() => setChangePasswordPopupVisible(true)}
              >
                Change Password
              </button>
              <PopUp
                title="Change Password"
                message="Please enter your new password"
                children={
                  <form className="flex flex-col gap-2 min-w-full">
                    <Input
                      name="currentPassword"
                      id="currentPassword"
                      label="Current Password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                      name="password"
                      id="password"
                      label="Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                      name="confirmPassword"
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      value={newConfirmPassword}
                      onChange={(e) => setNewConfirmPassword(e.target.value)}
                    />
                  </form>
                }
                onAccept={changePassword}
                onDecline={() => setChangePasswordPopupVisible(false)}
                onClose={() => setChangePasswordPopupVisible(false)}
                acceptText="Change Password"
                declineText="Cancel"
                visible={changePasswordPopupVisible}
              />
            </div>
            {/* <div className="flex flex-col gap-2 w-full mt-3">
              <h2 className="text-lg font-bold text-gray-300">Devices</h2>
              <p className="text-sm text-gray-400">
                View all the devices that are logged in to your account
              </p>
              <div className="flex flex-col gap-2 w-full mt-3">
                <div className="flex flex-col gap-2 w-full mt-3">
                  <h4 className="text-sm text-gray-400">
                    <ul className="list-none list-inside ">
                      {user.devices.map((device, index) => (
                        <li key={index}>{device.userAgent}</li>
                      ))}
                    </ul>
                  </h4>
                </div>
              </div>
            </div> */}
            <div className="flex flex-col gap-2 w-full mt-3">
              <h2 className="text-lg font-bold text-gray-300">Logout</h2>
              <p className="text-sm text-gray-400">Logout from your account</p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer w-full"
                onClick={() => setLogoutPopupVisible(true)}
              >
                Logout
              </button>
              {logoutPopupVisible && (
                <WarningPopUp
                  message="Are you sure you want to logout?"
                  onYes={async () => {
                    await logoutUser();
                    window.location.href = "/login";
                  }}
                  onNo={() => setLogoutPopupVisible(false)}
                  onClose={() => setLogoutPopupVisible(false)}
                  visible={logoutPopupVisible}
                  yesText="Yes"
                  noText="No"
                />
              )}
            </div>
            <div className="flex flex-col gap-2 w-full mt-3">
              <h2 className="text-lg font-bold text-gray-300">
                Delete Account
              </h2>
              <p className="text-sm text-gray-400">
                Delete your account to remove all your data
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer w-full"
                onClick={() => setDeleteAccountPopupVisible(true)}
              >
                Delete Account
              </button>
              {deleteAccountPopupVisible && (
                <WarningPopUp
                  message="Are you sure you want to delete your account?"
                  onYes={deleteAccount}
                  onNo={() => setDeleteAccountPopupVisible(false)}
                  visible={deleteAccountPopupVisible}
                  yesText="Delete Account"
                  noText="Cancel"
                  onClose={() => setDeleteAccountPopupVisible(false)}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default Profile;
