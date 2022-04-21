import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-duotone-svg-icons";

import HeaderSearch from "./HeaderSearch";
import UserPicCircle from "../../ui/design-elements/UserPicCircle";
import headerClasses from "./Header.module.scss";
import layoutClasses from "../Layout.module.scss";

interface Props {
    onToggleSidebar: () => void;
}

const Header: React.FC<Props> = ({ onToggleSidebar }) => {
    const [showSearch, setShowSearch] = useState(true); // Show or hide full searchbar on the mobile screen
    const { user, isLoading } = useUser();

    const isLoggedIn = user && !isLoading;

    return (
        <header
            className={`text-slate-700 bg-slate-200 ${layoutClasses.header} ${headerClasses.header}`}
        >
            {/* Left Side */}
            <div className={`${headerClasses.heading}`}>
                <FontAwesomeIcon
                    icon={faBars}
                    className="max-w-[1.5rem] text-2xl cursor-pointer"
                    onClick={onToggleSidebar}
                />
                <Link href="/">
                    <a className={`text-2xl ml-4 ${showSearch ? headerClasses.hide : ""}`}>
                        Task Manager
                    </a>
                </Link>
                <HeaderSearch onShowSearch={setShowSearch} showSearch={showSearch} />
            </div>

            {/* Right side */}
            <div className={`space-x-5 text-lg font-semibold text-slate-500 flex items-center`}>
                <Link href="/api/auth/login">
                    <a className={linkClass}>About</a>
                </Link>
                <Link href="/api/auth/login">
                    <a className={linkClass}>Contact</a>
                </Link>
                {!isLoggedIn && (
                    <Link href="/api/auth/login">
                        <a className={linkClass}>Login</a>
                    </Link>
                )}

                {!isLoggedIn && (
                    <Link href="/api/auth/login">
                        <a className={linkClass}>Sign Up</a>
                    </Link>
                )}
                {isLoggedIn && (
                    <>
                        <Link href="/api/auth/logout">
                            <a className={linkClass}>Logout</a>
                        </Link>
                        <UserPicCircle pictureLink={user.picture} userName={user.name} />
                    </>
                )}
            </div>
        </header>
    );
};

const linkClass = "hover:text-blue-400";

export default Header;
