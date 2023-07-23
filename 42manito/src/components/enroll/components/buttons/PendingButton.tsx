import { usePatchReservationCompleteMutation } from "@/RTK/Apis/Enroll";
import { ReservationPatchMenteeCompletionDto } from "@/Types/Reservations/ReservationPatchMenteeCompletion.dto";
import { ReservationPostDto } from "@/Types/Reservations/ReservationPost.dto";
import ConnectModal from "@/components/conect/ConnectModal";
import FeedbackPost from "@/components/feedback/FeedbackPost";
import MuiRate from "@/components/global/MuiRate";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

interface FinishButtonProps {
  data: number;
  isVisible: boolean;
}

const PendingButton = ({ data, isVisible }: FinishButtonProps) => {
  const [onConnectModal, setOnConnectModal] = useState<boolean>(false);
  const [rating, setRiting] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [complete] = usePatchReservationCompleteMutation();

  const openConnectModal = () => {
    setOnConnectModal(true);
  };

  const handleYes = useCallback(() => {
    if (rating === 0 || content === "") {
      alert("평점 또는 피드백 메시지를 입력해주세요.");
    } else {
      complete({ id: data, rating: rating, content: content });
      setOnConnectModal(false);
    }
  }, [data]);

  const closeConnectModal = useCallback(() => {
    setOnConnectModal(false);
  }, []);

  const handleRating = (rating: number) => {
    setRiting(rating);
  };

  const handleContent = (content: string) => {
    setContent(content);
  };

  if (!isVisible) return null;

  return (
    <div className="mt-4">
      {/* <Link href={`/Feedback?isFinish=${true}&id=${data}`}> */}
      <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={openConnectModal}
      >
        피드백
      </button>

      {onConnectModal && (
        <ConnectModal
          message="피드백을 완료하시겠습니까?"
          onClose={closeConnectModal}
          handleYes={handleYes}
        >
          <MuiRate Value={rating} setValue={handleRating} IsReadOnly={false} />
          <TextArea
            showCount
            maxLength={300}
            style={{ height: 80, marginBottom: 24 }}
            onChange={(e) => setContent(e.target.value)}
            placeholder="최대 300글자"
          />
        </ConnectModal>
      )}
    </div>
  );
};

export default PendingButton;