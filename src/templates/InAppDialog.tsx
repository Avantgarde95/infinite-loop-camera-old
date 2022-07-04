import React from "react";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

interface Props {
  open: boolean;
  onClose: () => void;
}

const InAppDialog = ({ open, onClose }: Props) => (
  <Dialog open={open} onClose={onClose}>
    <Paragraph>
      이 사이트는 카카오톡 등 인앱브라우저 환경에서는 정상적으로 작동하지
      않습니다! 사용하시는 웹 브라우저로 직접 열고, 카메라 선택 창에서 새로고침
      버튼을 한번 누르시기를 권장합니다.
    </Paragraph>
    <CloseButton onClick={onClose}>닫기</CloseButton>
  </Dialog>
);

const Paragraph = styled.p`
  box-sizing: border-box;

  width: 100%;
  padding: 0 1rem;
`;

const CloseButton = styled(Button)`
  color: inherit;
  font-weight: normal;
  font-size: 1rem;
`;

export default InAppDialog;
