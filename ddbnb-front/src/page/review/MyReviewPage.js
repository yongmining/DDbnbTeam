import StarPoint from "../../component/item/StarPoint";
import style from "./MyReviewPage.module.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MyReviewPage() { 

    const review = useSelector(state => state.reviewReducer);
    const navigate = useNavigate();
    const closeHandler = () => {
        navigate("/myPage");
    }
    return (
        <section className={style.board}>
            <section>
                <button className={style.imageBtn}> &lt; </button>
            </section>
            <article>
                <div className={style.content}>
                    <div className={style.image}>사진</div>
                    <article>( n / n )</article>
                    <section className={style.contentContainer}>
                        <div style={{display : 'flex', borderBottom : '1px solid #8d8d8d' }}>
                            <div>닉네임 님</div>
                            <StarPoint starPoint={review.reviewStarPoint} />
                        </div>
                        <section className={style.context}>제목
                            <section>리뷰 상세 내용</section>
                        </section>
                        <div style={{display : 'flex', alignItems : 'center', justifyItems : 'center'}}>
                        <button>리뷰 답장</button>
                        <button onClick={closeHandler}>닫기</button>
                        </div>
                    </section>
                </div>
            </article>
            <section>
                <button className={style.imageBtn}> &gt; </button>
            </section>
        </section>
    )
}

export default MyReviewPage;