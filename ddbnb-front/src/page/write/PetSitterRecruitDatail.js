import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "../write/detail.css"
import ReviewModal from "../../component/modal/review/ReviewModal";
import ReviewList from "../../component/modal/review/ReviewList";
import Modal from 'react-modal';
import { CLOSE_MODAL, OPEN_MODAL } from "../../modules/petSittermodal";
import CollectFinish from '../../component/modal/collect/CollectFinish';
import CollectCancel from '../../component/modal/collect/CollectCancel';
import { getPetsitterdetailAPI } from "../../api/petsitterAPI";
import { useNavigate, useParams } from 'react-router-dom';
import style from './PetSitterRecruitDatail.module.css';
import Declaration from '../../component/modal/declaration/Declaration';
import ApplicantsList from '../../component/modal/apply/ApplicantsList';
import ApplyModal from '../../component/modal/apply/ApplyModal';


function PetSitterRecruitDatail() {

    const [showModalReview, setShowModalReview] = useState(false);
    const [showModalList, setShowModalList] = useState(false);
    const [showApplicantList, setOpenApplicantList] = useState(false);

    const navigate = useNavigate()

    const { declaration: showModal, petsittercollectcancle, petsitterApply, petsittercollectfinish } = useSelector(state => state.modalsReducer);
    const dispatch = useDispatch();

    const openModals = () => {
        dispatch({ type: OPEN_MODAL, payload: "declaration" });
    };

    const openModal = (type) => {
        dispatch({ type: OPEN_MODAL, payload: type });
    };

    const closeModal = () => {
        dispatch({ type: CLOSE_MODAL });
    };

    const openCollectCancleModal = () => {
        dispatch({ type: OPEN_MODAL, payload: "petsittercollectcancle" });
    };

    const openCollectFinishModal = () => {
        dispatch({ type: OPEN_MODAL, payload: "petsittercollectfinish" });
    };

    const openApplicantList = () => {
        setOpenApplicantList(true);
    };
    const closeModalReview = () => {
        setShowModalReview(false);
    };

    const openModalList = () => {
        setShowModalList(true);
    };

    const closeModalList = () => {
        setShowModalList(false);
    };

    const closeApplicantList = () => {
        setOpenApplicantList(false);
    };


    const petsdetail = useSelector(state => state.petSitterReducer) || { images: [] };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const { boardId } = useParams();

    useEffect(
        () => {
            dispatch(getPetsitterdetailAPI(boardId));
        },
        []
    )

    const token = JSON.parse(window.localStorage.getItem('accessToken'));
    const postUser = token !== null && token.memberId === petsdetail.member?.memberId ? true : false;

    const totalImages = petsdetail.boardImage ? petsdetail.boardImage.length : 0;

    const changeImage = (direction) => {
        let newIndex = currentImageIndex + direction;
        if (newIndex < 0) {
            newIndex = totalImages - 1; // 마지막 이미지로 순환
        } else if (newIndex >= totalImages) {
            newIndex = 0; // 첫 번째 이미지로 순환
        }
        setCurrentImageIndex(newIndex);
    };

    return (
        <div className={style.heightauto}>
            <div className="dateAndWriter">
                <h1>게시판</h1>
                <div>
                    {postUser ?
                        (<>
                            <button className="declarationButton" onClick={() => navigate("./modify")}>수정</button>
                            {petsdetail.boardStatus === '모집중' && <button className="declarationButton1" onClick={openCollectCancleModal}>모집취소</button>}
                        </>) :
                        <button className="declarationButton" onClick={openModals}>신고</button>}
                    <Modal className="modal-backdrop" isOpen={showModal} onRequestClose={closeModal}>
                        <Declaration category="게시글" />
                    </Modal>
                </div>
                <Modal className="modal-backdrop" isOpen={petsittercollectcancle} onRequestClose={closeModal}>
                    <CollectCancel />
                </Modal>
            </div>
            <div className="dateAndWriter">
                <h5>작성자 : {petsdetail?.member?.nickname}</h5>
                <h5>작성일: {petsdetail.boardDate}</h5>
            </div>
            <hr className="line"></hr>

            <div className="images">
                <button className="imageBtn" onClick={() => changeImage(-1)}> &lt; </button>
                {petsdetail.boardImage && petsdetail.boardImage.length > 0 ?
                    (
                        <img className='imgsize' src={petsdetail.boardImage[currentImageIndex].imageUrl} alt=" 사진이 없습니다!" />
                    ) :
                    null
                }
                <button className="imageBtn" onClick={() => changeImage(1)}> &gt; </button>
            </div>

            <h2 className="text">{currentImageIndex + 1}/{totalImages}</h2>
            <div className="comment">
                <h3 className="comment-content" style={{ right: '4%' }}>게시판</h3>
                <h3 className="comment-content2" style={{ left: '13px' }} > {petsdetail.boardCategory}</h3>
            </div>
            <hr className="line"></hr>
            <div className="comment">
                <h3 className="comment-content">제목 </h3>
                <h3 className="comment-content2" >{petsdetail.boardTitle}</h3>
            </div>
            <hr className="line"></hr>
            <div className="comment">
                <h3 className="comment-content">지역</h3>
                <h3 className="comment-content2" >{petsdetail.location}</h3>
            </div>
            <hr className="line"></hr>

            <div className="comment">
                <h3 className="comment-content">돌봄</h3>
                <button className={`choice-box ${petsdetail.care === '방문' ? 'selected' : ''}`}>방문</button>
                <button className={`choice-box ${petsdetail.care === '출장' ? 'selected' : ''}`}>출장</button>
                <button className={`choice-box ${petsdetail.care === '산책' ? 'selected' : ''}`}>산책</button>

            </div>
            <hr className="line"></hr>

            <div className="comment">
                <h3 className="comment-content">기간</h3>
                <h3 className="comment-content2" >{petsdetail.startDate}~{petsdetail.endDate}</h3>
                <h3 className="comment-content3">사례금</h3>
                <h3 className="comment-content4">{petsdetail.rate}</h3>
            </div>
            <hr className="line"></hr>
            {/* <img className="dogimg" src={petsdetail?.boardImage[0]?.imageUrl} /> */}
            <div className="formsize">
                <div className="doginfo3">
                    <div className="size">
                        <button className="doginfo-button">이름</button>
                        <h3>{petsdetail.petName}</h3>
                    </div>
                    <hr className="line"></hr>
                    <div className="size">
                        <button className="doginfo-button">나이</button>
                        <h3>{petsdetail.petAge}살</h3>
                    </div>
                    <hr className="line"></hr>
                    <div className="size">
                        <button className="doginfo-button">견종</button>
                        <h3>{petsdetail.petShape}</h3>
                    </div>
                    <hr className="line"></hr>
                    <div className="size">
                        <button className="genderbtn" >성별</button>
                        <h3>{petsdetail.petGender}</h3>
                        <button className="sizebtn">크기</button>
                        <h3 className="size-position">{petsdetail.petSize}</h3>
                    </div>
                    <hr className="line"></hr>
                    <div className="doginfo2">
                        <button>특이사항</button>
                        <textarea value={petsdetail.signficant}></textarea>
                    </div>
                </div>
                <div className="dogplz">
                    <h2>우리 강아지를 맡아주세요</h2>
                    <textarea value={petsdetail.request}></textarea></div>
            </div>
            <div>
                <div className="endline2">
                    <hr className="line"></hr>

                    {postUser ?
                        (<>
                            <button className="wantbtn2" onClick={openApplicantList}>신청자 목록</button>
                            {petsdetail.boardStatus === '모집마감' ?
                                <button className="wantbtn2" onClick={openModalList}>리뷰 목록</button> :
                                <button className="wantbtn2" onClick={openCollectFinishModal}>모집마감</button>}
                        </>) :
                        <button className="wantbtn2" onClick={() => openModal("petsitterApply")}>신청하기</button>
                    }

                    <Modal className="modal-backdrop" isOpen={petsittercollectfinish} onRequestClose={closeModal}>
                        <CollectFinish />
                    </Modal>
                    <Modal className="modal-backdrop" isOpen={petsitterApply} onRequestClose={closeModal}>
                        <ApplyModal boardId={boardId} />
                    </Modal>

                    {showModalReview && <ReviewModal closeModalReview={closeModalReview} />}
                    {showModalReview && <div className="modal-backdrop" onClick={closeModalReview} />}

                    {showModalList && <ReviewList closeModalList={closeModalList} />}
                    {showModalList && <div className="modal-backdrop" onClick={closeModalList} />}

                    {showApplicantList && <ApplicantsList />}
                    {showApplicantList && <div className="modal-backdrop" onClick={closeApplicantList} />}
                </div>
            </div >
        </div >
    );
};

export default PetSitterRecruitDatail;