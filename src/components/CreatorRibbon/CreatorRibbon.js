import React from 'react';
import './CreatorRibbon.scss';

const CreatorRibbon = () => {
  return (
    <div className="creator-ribbon" title="Created by Mr. Gajera Jenis">

      {/* Top tab label */}
      <div className="creator-ribbon__tab">Creator</div>

      {/* Main card */}
      <div className="creator-ribbon__card">

        {/* Shimmer sweep */}
        <div className="creator-ribbon__shimmer" />

        {/* Live pulse dot */}
        <div className="creator-ribbon__dot" />

        {/* Avatar with spinning ring */}
        <div className="creator-ribbon__avatar">
          <div className="creator-ribbon__avatar-inner">GJ</div>
          <div className="creator-ribbon__corner-ring" />
        </div>

        {/* Text */}
        <div className="creator-ribbon__text">
          <span className="creator-ribbon__by">Created by</span>
          <span className="creator-ribbon__name">
            Mr. <span>Gajera</span> Jenis
          </span>
          <span className="creator-ribbon__title">EduManage · Developer</span>
        </div>

      </div>
    </div>
  );
};

export default CreatorRibbon;