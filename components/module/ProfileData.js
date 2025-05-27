import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

function ProfileData({ data }) {
  const router = useRouter();
  const updateProfile=()=>{
    router.push("/edit-profile");
  }
  const deleteHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.warning("Your account deleted!");
      setTimeout(() => {
        signOut();
      }, 1500);
    }
  };
  return (
    <div className="profile-data">
      <div>
        <span>Name: </span>
        <p>{data.name}</p>
      </div>
      <div>
        <span>Last Name: </span>
        <p>{data.lastName}</p>
      </div>
      <div>
        <span>Email: </span>
        <p>{data.email}</p>
      </div>
      <div className="profile-data__btns">
        <button className="first" onClick={updateProfile}>
          edit info
        </button>
        <button className="second" onClick={deleteHandler}>
          delete account
        </button>
      </div>
    </div>
  );
}

export default ProfileData;
