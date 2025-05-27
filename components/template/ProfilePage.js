import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../module/ProfileForm";
import ProfileData from "../module/ProfileData";
import { useRouter } from "next/router";

function ProfilePage() {
  const [data, setData] = useState(null);
  const router=useRouter()
  
  useEffect(() => {
    const pathname=router.pathname;
    const {state}=router.query;
    if(pathname==="/profile" ||state==="profile-create")
      fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    //console.log("fetchData",data);
    if (data.status === "success" && data.data.name && data.data.lastName) {
     // console.log("fetch");
      setData(data.data);
    }
  };
  
  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {data ? (
        <ProfileData data={data} />
      ) : (
        <ProfileForm/>
      )}
    </div>
  );
}

export default ProfilePage;
