import { memo } from "react";

function HomeInfo() {
  return (
    <div className="homeinfo">
      <div className="homeinfo__content">
        <div className="line"></div>
        <div className="title title-big">Why should you have a cat?</div>
        <p>
          Having a cat around you can actually trigger the release of calming chemicals in your body
          which lower your stress and anxiety levels.
        </p>
        <div className="link-cta">
          READ MORE <span>&rarr;</span>
        </div>
      </div>
      <div className="homeinfo__images">
        <div className="homeinfo-image image1">
          <img src="/why1.png" alt="why1" />
        </div>
        <div className="homeinfo-image image2">
          <img src="/why2.png" alt="why2" />
        </div>
        <div className="homeinfo-image image3">
          <img src="/why3.png" alt="why3" />
        </div>
      </div>
    </div>
  );
}

export default memo(HomeInfo);
