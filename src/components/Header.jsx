import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FaUserCheck , FaUser  } from "react-icons/fa";
import { FaPenNib,  } from "react-icons/fa6";

export default function Header() {
    const { user , handleLogin, handleLogout } = useAuthContext();
    // 수정사항 모바일 휴대폰에서 구글 로그인 기능 안됨. 확인 요망

    return(
        <header className="border-b border-regular-greyBorder">
            <div className="flex justify-between items-center w-full h-[60px] px-4 md:px-6 xl:max-w-screen-xl xl:mx-auto"> 
                <h1><Link to='/'><img src="/images/logo.png" alt="main-logo" className="w-16 md:w-[112px]"/></Link></h1>
                <ul className="flex items-center gap-4 [&>li]:flex">
                    { user && <li><Link to='/posts/new'><FaPenNib /></Link></li>}
                    { user && <li><img src={user.photoURL} alt="USER" className="w-4 h-4 rounded-full"/></li>}
                    <li>
                        {
                            !user ? (
                                <button onClick={handleLogin}><FaUser /></button>
                            ) : (
                                <button onClick={handleLogout}><FaUserCheck /></button>
                            )
                        }  
                    </li>
                </ul>                   
           </div>
        </header>
    )
}