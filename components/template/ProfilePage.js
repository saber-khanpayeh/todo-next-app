import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../module/ProfileForm";
import ProfileData from "../module/ProfileData";

function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [updateProfile, setUpdateProfile] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    if (updateProfile) {
      setName(data.name);
      setLastName(data.lastName);
      //console.log("update");
    }
  }, [updateProfile]);
  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    //console.log("fetchData",data);
    if (data.status === "success" && data.data.name && data.data.lastName) {
     // console.log("fetch");
      setData(data.data);
    }
  };
  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
   // console.log(data);
    if (data.status === "success") {
      await fetchProfile();
    }
  };
  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {data && !updateProfile ? (
        <ProfileData data={data} setUpdateProfile={setUpdateProfile} />
      ) : (
        <ProfileForm
          name={name}
          lastName={lastName}
          password={password}
          setName={setName}
          setLastName={setLastName}
          setPassword={setPassword}
          setData={setData}
          updateProfile={updateProfile}
          setUpdateProfile={setUpdateProfile}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
}

export default ProfilePage;
