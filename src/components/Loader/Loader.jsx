import React from 'react';
import ContentLoader from "react-content-loader";

const Loader = () => (
    <ContentLoader
        speed={2}
        width={150}
        height={200}
        viewBox="0 0 150 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
        <rect x="0" y="107" rx="5" ry="5" width="150" height="15" />
        <rect x="0" y="132" rx="5" ry="5" width="93" height="15" />
        <rect x="0" y="170" rx="8" ry="8" width="80" height="24" />
        <rect x="119" y="163" rx="8" ry="8" width="32" height="32" />
    </ContentLoader>
);

export default Loader;