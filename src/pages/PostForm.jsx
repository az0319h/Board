import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useAddNewPost } from "../api/postMutations";

export default function PostForm() {
    const { user } = useAuthContext();
    const { mutateAsync : addPost } = useAddNewPost();
    const [form, setForm] = useState({})
    const [postSuccess, setPostSuccess] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date();
        const iso = now.toISOString(); // 예: "2025-04-16T00:32:10.123Z"
        const [datePart, timePart] = iso.split("T");

        const result = await addPost({...form , uid : user.uid, datePart})
        if(result) setPostSuccess(true);
    }

    const handleChange = (e) => {
        const { name } = e.target;
        setForm(prev => ({...prev, [name] : e.target.value}))
    }

    const handleClose = () => {
        navigate(`/`) // 다시 홈으로 이동
    }

    return(
        <div className="flex justify-center items-center fixed top-0 left-0 z-50 w-full min-h-screen bg-primary-blackOpacity">
            <div className="sticky w-full max-w-lg mx-4 bg-regular-blackModal px-4 py-4 rounded-2xl">
                {
                    !postSuccess ? (
                        <div className="flex flex-col gap-4 md:gap-6">
                            <div className="flex items-center">
                                <h2 className="flex-1 font-semibold md:text-xl">게시글 작성하기</h2>
                                <button onClick={handleClose} className=""><AiOutlineClose className="w-6 h-6"/></button>    
                            </div>
                            <form 
                                onSubmit={handleSubmit} 
                                className="
                                    flex flex-col gap-4
                                    md:gap-6
                                    [&>div]:flex [&>div]:flex-col [&>div]:gap-3 [&>div:last-child]:!flex-row [&>div:last-child]:justify-center 
                                    [&>div>label]:text-sm [&>div>label]:font-semibold
                                    [&>div>label]:md:text-lg
                                    [&>div>input]:px-5 [&>div>input]:py-3 [&>div>input]:border [&>div>input]:rounded-[10px] [&>div>input]:border-regular-greyBorder [&>div>input]:text-sm
                                    [&>div>input]:md:py-4 [&>div>input]:md:text-base
                                    [&>div>select_*]:text-center
                                    [&>div>select]:bg-transparent [&>div>select]:outline-0 [&>div>select]:py-3 [&>div>select]:rounded-[10px] [&>div>select]:px-5 [&>div>select]:border [&>div>select]:border-regular-greyBorder [&>div>select]:text-sm
                                    [&>div>select]:md:py-4 [&>div>select]:md:text-base
                                    [&>div>select>option]:bg-black
                                    [&>div>button]:w-[135px] [&>div>button]:py-3 [&>div>button]:px-6 [&>div>button]:text-sm [&>div>button]:font-semibold [&>div>button]:bg-primary-orange [&>div>button]:rounded-[50px] [&>div>button:first-child]:bg-transparent
                                    [&>div>button]:md:w-[194px] [&>div>button]:md:text-base
                                "
                            >
                                <div>
                                    <label htmlFor="name">작성자 이름</label>
                                    <input type="text" name="name" id="name" value={form?.name || ""} onChange={handleChange} placeholder="작성자 이름을 입력해 주세요" required/>    
                                </div>
                                <div>
                                    <label htmlFor="title">게시글 제목</label>
                                    <input type="text" name="title" id="title" value={form?.title || ""} onChange={handleChange} placeholder="게시글 제목을 입력해 주세요" required/>    
                                </div>
                                <div>
                                    <label htmlFor="content">게시글 내용</label>
                                    <input type="text" name="content" id="content" value={form?.content || ""} onChange={handleChange} placeholder="게시글을 입력해 주세요" required/>    
                                </div>
                                <div>
                                    <label htmlFor="category">카테고리 선택</label>
                                    <select name="category" id="category" onChange={handleChange} required defaultValue="">
                                        <option value="" disabled>- 카테고리 -</option>
                                        <option value="notice">공지사항</option>
                                        <option value="free">자유게시판</option>
                                        <option value="question">질문답변</option>
                                        <option value="tip">정보/팁</option>
                                        <option value="review">후기게시판</option>
                                        <option value="event">이벤트</option>
                                    </select>
                                </div>    
                                <div>
                                    <button onClick={handleClose} style={{border : "1px solid #EB5230", color : "#EB5230"}}>취소</button>
                                    <button>게시글 업로드</button>            
                                </div>         
                            </form>
                        </div>
                    ) : (
                        <div className="">
                            <button onClick={handleClose} className="absolute top-4 right-4"><AiOutlineClose className="w-6 h-6"/></button>    
                            <div className="flex flex-col gap-6 items-center mt-8">
                                <p className="text-sm md:text-base">게시글 업로드를 완료했습니다!</p>
                                <button onClick={handleClose} className="flex items-center justify-center w-[124px] md:w-[194px] px-6 py-3 font-semibold rounded-[50px] bg-primary-orange ">확인</button>
                            </div>
                        </div>
                    )
                }
            </div>     
        </div>
    )
}

