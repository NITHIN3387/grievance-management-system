import Logo from "@components/Logo";
import Link from "next/link";

const HomeNavbar = () => {
  return (
    <div className="flex justify-between pe-4 h-[5rem] items-center bg-blue-950">
      {/* logo of the website  */}
      <Link href={"/"}>
        <Logo />
      </Link>
    </div>
  );
};

export default HomeNavbar;
