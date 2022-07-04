import React from "react";
import Dialog from "@mui/material/Dialog";

import { Paragraph, TextButton } from "components/DialogParts";

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
    <TextButton onClick={onClose}>닫기</TextButton>
  </Dialog>
);

export default InAppDialog;
