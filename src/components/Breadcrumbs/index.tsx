import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom"

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const capitalizedSnippet = snippet.charAt(0).toUpperCase() + snippet.slice(1);
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    return (
      <Breadcrumb.Item key={url}>
        {index === pathSnippets.length - 1 ? (
          <Link to={url} className="!bg-[#003c76]">
            {capitalizedSnippet}
          </Link>
        ) : (
          <Link to={url}>{capitalizedSnippet}</Link>
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb>
      {breadcrumbItems.length > 0 && (
        <>
          <Breadcrumb.Item key="home">
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          {breadcrumbItems}
        </>
      )}
    </Breadcrumb>
  );
};
