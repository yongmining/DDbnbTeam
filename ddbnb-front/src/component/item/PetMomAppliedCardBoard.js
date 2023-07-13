import style from './AppliedMomCardBoard.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMyApplyListAPI } from '../../api/applicantAPI';
import { useNavigate } from 'react-router-dom';
import CancelRequest from '../modal/mypage/CancelRequest';
import Modal from 'react-modal';
import { OPEN_MODAL, CLOSE_MODAL } from '../../modules/modalModules';

function PetMomAppliedCardBoard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //모달
    const cancel = useSelector(state => state.modalsReducer.cancel);

    const { data: applys } = useSelector(state => state.momApplicantsReducer);
    const currentPage = useSelector(state => state.pageReducer);

    useEffect(() => {
        dispatch(getMyApplyListAPI(currentPage, "펫맘"));
    }, [currentPage]
    );


    const closeModal = () => {
        dispatch({ type: CLOSE_MODAL });
    };
    return (
        <>
            <section className={style.section}>
                <article className={style.category}>
                    <div>전체</div>
                    <div>지역</div>
                    <div>게시글명</div>
                    <div>신청일</div>
                    <div>취소</div>
                </article>
            </section>

            {Array.isArray(applys) && applys.map((apply, index) =>
                <section className={`${style.category2} ${style.flex_center}`}>
                    <div>
                        <section style={apply.board.boardStatus === "취소됨" ? { backgroundColor: "#8d8d8d", color: "white" } : { backgroundColor: "#FAB7A2" }}>
                            {apply.board.boardStatus}
                        </section>
                    </div>
                    <div onClick={() => navigate(`/petMom/${apply.boardId.boardId}`)}>{apply.board.location}</div>
                    <div onClick={() => navigate(`/petMom/${apply.boardId.boardId}`)}>{apply.board.boardTitle}</div>
                    <div onClick={() => navigate(`/petMom/${apply.boardId.boardId}`)}>{apply.appliedDate}</div>
                    <div>
                        <button onClick={() => { dispatch({ type: OPEN_MODAL, payload: 'cancel' }) }}>신청취소</button>
                        <Modal className="modal-backdrop" isOpen={cancel} onRequestClose={closeModal}>
                            <CancelRequest applicantId={apply.applicantId} closeModalList={closeModal} />
                        </Modal>
                    </div>
                </section>
            )}
        </>
    );
}

export default PetMomAppliedCardBoard;