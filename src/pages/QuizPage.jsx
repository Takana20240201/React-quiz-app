import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Display from "../components/Display/Display"
import { ROUTES } from "../const";
import quizData from "../data/quiz"

export default function QuizPage() {

    const [quizIndex, setQuizIndex] = useState(0);
    const [answerLogs, setAnswerLogs] = useState([]);
    const navigation = useNavigate();
    const MAX_QUIZ_LEN = quizData.length;

    // 省略前
    // const handleClick = (clickedIndex) => {
    //     if (clickedIndex == quizData[quizIndex].answerIndex) {
    //         setAnswerLogs((prev) => [...prev, true])
    //     } else {
    //         setAnswerLogs((prev) => [...prev, false])
    //     }
    //     setQuizIndex((prev) => prev + 1)
    // };

    // 省略後
    const handleClick = (clickedIndex) => {
        if (clickedIndex == quizData[quizIndex].answerIndex) {
            setAnswerLogs(prev => [...prev, true])
        } else {
            setAnswerLogs(prev => [...prev, false])
        }
        setQuizIndex(prev => prev + 1)
    };

    // 省略前
    // useEffect(() => {
    //     if(answerLogs.length === MAX_QUIZ_LEN) {
    //         const correctNum = answerLogs.filter((answer) => {
    //             return answer === true
    //         })
    //         navigation(ROUTES.RESULT, {
    //             state: {
    //                 maxQuizLen: MAX_QUIZ_LEN,
    //                 correctNum: correctNum
    //             }
    //         });
    //     }
    // }, [answerLogs, MAX_QUIZ_LEN, navigation])

    // 省略後　関数の処理が１行だけで、値をreturnで返すだけなら、省略可能
    // useNavigate()を使うと、ページ遷移時にstateという形でデータを渡すことができる
    useEffect(() => {
        if(answerLogs.length === MAX_QUIZ_LEN) {
            const correctNum = answerLogs.filter(answer => answer === true)
            navigation(ROUTES.RESULT, {
                state: {
                    maxQuizLen: MAX_QUIZ_LEN,
                    correctNumLen: correctNum.length
                }
            });
        }
    }, [answerLogs, MAX_QUIZ_LEN, navigation])

    return (
        <>
            {quizData[quizIndex] && <Display>{`Q${quizIndex + 1}. ${quizData[quizIndex].question}`}</Display>}
            <br />
            {quizData[quizIndex] && quizData[quizIndex].options.map((option, index) =>
                <Button key={`option-${index}`} onClick={() => handleClick(index)}>{option}</Button>
            )}
        </>
    )
}