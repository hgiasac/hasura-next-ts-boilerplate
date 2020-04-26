import Link from "next/link";
import * as React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { actionOpenMobileSidebar } from "../../../store/global/actions";
import { IconButton } from "../General/Button";
import { OpenMobileSidebarAction } from "../../../store/global/types";

type IDispatchProps = {
  readonly openMobileSidebar: () => OpenMobileSidebarAction
};

type HeaderProps = IDispatchProps;

const Header: React.FunctionComponent<HeaderProps> = () => {

  const [isExpanded, toggleExpansion] = React.useState(false);
  const listClass =
    `${isExpanded ? "block" : "hidden"
    } md:flex flex-col md:flex-row md:items-center md:justify-center text-sm w-full md:w-auto`;

  return (
    <header className="bg-teal-500">
      <div className="flex flex-wrap md:flex-no-wrap items-center justify-between max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex items-center">
          <Link href="/">
            <a className="font-bold text-white text-xl">
              Next.js Starter Tailwind
            </a>
          </Link>
        </div>

        <IconButton
          icon="las la-bars"
          className="block md:hidden border border-white flex items-center px-3 py-2 rounded text-white"
          onClick={() => toggleExpansion(!isExpanded)}
        >
        </IconButton>

        <ul
          className={listClass}
        >
          {[
            { title: "Home", route: "/" },
            { title: "About", route: "/about" },
            { title: "Login", route: "/auth/login" }
          ].map((navigationItem) => (
            <li className="mt-3 md:mt-0 md:ml-6" key={navigationItem.title}>
              <Link href={navigationItem.route}>
                <a className="block text-white">{navigationItem.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, HeaderProps> = ({
  openMobileSidebar: () => actionOpenMobileSidebar
});

export default connect(null, mapDispatchToProps)(Header);
