import React from "react";
import BannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center">
      <div className="md:w-1/2 w-full h-auto flex items-center md:justify-end">
        <img src={BannerImg} alt="" />
      </div>
      <div className="md:w-1/2 w-full">
        <h1 className="text-2xl md:text-5xl font-medium mb-7 mt-10">
          New Releases This Week
        </h1>
        <p className="mb-10 max-w-xl">
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for
          everyone
        </p>
        <button className="btn-primary mb-10 md:mb-0">Subscribe</button>
      </div>
    </div>
  );
};

export default Banner;
