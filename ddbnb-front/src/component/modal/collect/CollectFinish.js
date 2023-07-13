import "../../../css/modaltest.css";
import React from "react";
import { CLOSE_MODAL } from '../../../modules/petSittermodal';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { putBoardStatusChange } from "../../../api/petsitterAPI";

function CollectFinish() {

    const dispatch = useDispatch();
    const { boardId } = useParams();

    const closeModal = () => {
        dispatch({ type: CLOSE_MODAL });
    };

    const onClickhan = () => {
        dispatch(putBoardStatusChange({ boardId, boardStatus: "모집마감" }));
        closeModal();
        window.location.reload();
    }

    return (
        <div className="modalsize111">
            <div className="inmodalcolor">
                모집 마감
            </div>
            <div className="dis-flex justify-between flex-column align-center">
                <h1 className="joinpet">모집을 마감하시겠습니까?</h1>
                <div className="dis-flex flex-column align-center ">
                    <h5 className="joinpost">모집을 마감하신 이후에는</h5>
                    <h5 className="joinpost">게시글 수정, 삭제가 불가하며,</h5>
                    <h5 className="joinpost">더이상 신청을 받을 수 없습니다.</h5>
                </div>

                <div className="button2list">
                    <button className="modalsize-button2" onClick={onClickhan}>
                        예
                    </button>
                    <button className="modalsize-button2" onClick={closeModal}>
                        아니요
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CollectFinish;