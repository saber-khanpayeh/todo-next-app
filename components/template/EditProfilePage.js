import React, { useEffect, useState } from "react";
import ProfileForm from "../module/ProfileForm";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";

function EditProfilePage() {
  const router = useRouter();
  const { isReady } = router;
  const [data, setData] = useState(null);
  useEffect(() => {
    if (isReady) {
      fetch("/api/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") setData(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [isReady]);
  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Edit Information
      </h2>
      <ProfileForm data={data} />
    </div>
  );
}

export default EditProfilePage;
