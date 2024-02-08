import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";

const Update = ({ setOpenUpdate, user }) => {
  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  });

  console.log(profile);
  console.log(cover);

  const upload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    },
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="update">
      <form>
        <input
          id="file"
          type="file"
          onChange={(e) => setCover(e.target.files[0])}
        />
        <input
          id="file"
          type="file"
          onChange={(e) => setProfile(e.target.files[1])}
        />
        <input
          id="userInfo"
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          id="userInfo"
          type="text"
          placeholder="City"
          name="city"
          onChange={handleChange}
        />
        <input
          id="userInfo"
          type="text"
          placeholder="Website"
          name="website"
          onChange={handleChange}
        />
        <button onClick={handleClick}>Update</button>
      </form>
      <button id="exitButton" onClick={() => setOpenUpdate(false)}>
        x
      </button>
    </div>
  );
};

export default Update;
