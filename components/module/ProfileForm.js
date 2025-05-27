import { useRouter } from "next/router";
import React, { useState } from "react";

function ProfileForm({ data }) {
  const router = useRouter();
  const pathname = router.pathname;
  const [name, setName] = useState(data?.name || "");
  const [lastName, setLastName] = useState(data?.lastName || "");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);
    if (data.status === "success") {
      if (pathname === "/edit-profile") router.push("/profile");
      else router.push("/profile?state=profile-create");
    }
  };

  return (
    <>
      <div className="profile-form__input">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            id="last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button onClick={submitHandler}>
        {pathname === "/edit-profile" ? "Confirm" : "Submit"}
      </button>
    </>
  );
}

export default ProfileForm;
