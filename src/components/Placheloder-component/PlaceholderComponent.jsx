import "./placeholder-component.scss";

import ContentLoader from "react-content-loader";

const PlaceholderComponent = () => {
  return (
    <ContentLoader
      className="img-loader"
      speed={2}
      width={300}
      height={450}
      viewBox="0 0 300 450"
      backgroundColor="#d9d9d9"
      foregroundColor="#ededed"
    >
      <rect x="0" y="0" rx="20" ry="20" width="300" height="450" />
    </ContentLoader>
  );
};

export default PlaceholderComponent;
