import { Link } from "react-router-dom";

function ButtonSidebar({ img, img2, slug, name, barVisible }) {
  const path = window.location.pathname;
  return (
    <Link
      onClick={barVisible}
      to={slug}
      className={`flex items-center justify-start gap-3 no-underline text-white leading-8 px-2 py-2 rounded-lg ${
        slug == path || slug.slice(1, slug.length-1) == path.slice(1, slug.length-1)
          ? "bg-moodGray border border-brGray "
          : ""
      }`}
    >
      <span
        className={`flex gap-3 text-lg font-semibold ${
          slug === path ? "text-white" : "text-iconColor"
        }`}
      >
        {" "}
        <img
          src={slug == path || slug.slice(1, slug.length-1) == path.slice(1, slug.length-1) ? img : img2}
          width={22}
          height={22}
          alt="##"
        />{" "}
        {name}
      </span>
    </Link>
  );
}

export default ButtonSidebar;
