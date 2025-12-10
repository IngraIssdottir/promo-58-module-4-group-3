import React from 'react';
import defaultAvatar from '../../images/avatar.webp';


function Profile({data}) {
  const avatar = data.photo === '' ? defaultAvatar : data.photo;
  return (
    <div className="profile">
      <div
        className="profile__avatar"
        style={{ backgroundImage: `url(${avatar})` }}
      ></div>
    </div>
  );
}



export default Profile;