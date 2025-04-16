import { createContext, useContext, useEffect, useState } from "react";
import { auth, login, logout, onUserStateChanged } from "../api/firebase";
import IsLoading from "../components/IsLoading";
import { getRedirectResult } from "firebase/auth";

const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // 리디렉션 로그인 처리(모바일)
        getRedirectResult(auth)
        .then((result) => {
            if (result?.user) {
                setUser(result.user); // 로그인 완료 상태 저장
                setIsLoading(true); // 로딩 완료 처리
                return;
            }
        })
        .catch((error) => {
            console.error("리디렉션 로그인 실패:", error);
        })
    
        // 실시간 로그인 감지 
        onUserStateChanged((user) => {
            setUser(user)
            setIsLoading(true)
        })
    }, [])

    const handleLogin = async () => {
        const res = await login()
        setUser(res)
    }

    const handleLogout = async () => {
        logout();
        setUser(null)
    }

    if(!isLoading) return <IsLoading /> //이거 굉장히 중요한 코드 지우고 refresh해보던가 ㅋㅋ

    return(
        <AuthContext.Provider value={{user, isLoading, handleLogin, handleLogout}}>{children}</AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}