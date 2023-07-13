import style from './MyPetSitterCardBoard.module.css';
import { useDispatch, useSelector } from "react-redux";
import PageBtn from '../common/PageBtn';
import { useEffect} from "react";
import { Link } from 'react-router-dom';
import { getMyPetSitterList } from '../../api/petsitterAPI';

function MyPetSitterCardBoard() {
    
    //리덕스
    const dispatch = useDispatch();
    const myPetSitter = useSelector(state => state.petSitterReducer);
    const currentPage = useSelector(state => state.pageReducer);
    const { data: mypetSitters, pageInfo } = myPetSitter;

    useEffect(() => {
        dispatch(getMyPetSitterList({ currentPage: currentPage }));

    }, [currentPage]);

    return (
        <>
        <section className={style.section}>
            <article className={style.category}>
                <div>전체</div>
                <div>지역</div>
                <div>견종</div>
                <div>게시글명</div>
                <div>작성일</div>
            </article>
        </section>
        
        {Array.isArray(mypetSitters) && mypetSitters.map((myPetSitter, index) =>
            <Link to={`/petsitter/${myPetSitter.boardId}`} style={{ textDecoration: 'none', color: '#202020' }}>
                <section className={`${style.category2} ${style.flex_center}`}>
                    <div>
                        <section style={myPetSitter.boardStatus === "취소됨" ? { backgroundColor : "#8d8d8d", color:"white"} : {backgroundColor : "#FAB7A2"}}>
                            {myPetSitter.boardStatus}
                        </section>
                    </div>
                    <div>{myPetSitter.location}</div>
                    <div>{myPetSitter.petShape}</div>
                    <div>{myPetSitter.boardTitle}</div>
                    <div>{myPetSitter.boardDate}</div>
                </section>
            </Link>
        )}
        <PageBtn pageInfo={pageInfo} />
        </>
    )
}

export default MyPetSitterCardBoard;