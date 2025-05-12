import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../const";
import Result from "../components/Result/Result";
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";

export default function ResultPage() {
    const [active, setActive] = useState(false);
    // useLocation()を使うと、ページ遷移時にstateという形でデータを渡すことができる
    // useLocation()は、現在のURLの情報を取得するためのフック
    // useLocation()を使うことで、現在のURLの情報を取得することができる
    const location = useLocation();
    const maxQuizLen = location.state.maxQuizLen;
    const correctNumLen = location.state.correctNumLen;

    useEffect(() => {
        setTimeout(() => setActive(true), 2000);
    }, [])

    return (
        <>
            <Loading active={active} />
            <h1>Result</h1>
            <Result maxQuizLen={maxQuizLen} correctNumLen={correctNumLen} />
            <br />
            <Link to={ROUTES.QUIZ}>もう一度挑戦する</Link>
        </>
    )
}