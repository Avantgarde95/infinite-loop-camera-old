import React from "react";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AboutDialog = ({ open, onClose }: Props) => (
  <Dialog open={open} onClose={onClose}>
    <Paragraph>
      운동, 공부 등의 활동들을 기록할 때 사용하는 간단한 카메라 도구입니다!
    </Paragraph>
    <Paragraph>
      타임스탬프라는 앱에 많이 영향을 받았습니다. 해당 앱을 사용하면서, 무한루프
      코딩만을 위한 도구를 만들어보고 싶었습니다.
    </Paragraph>
    <Paragraph>
      제가 맥북이 없어 iOS 앱을 빌드할 수 없는지라, 일단 웹사이트 형태로
      제작했습니다.
    </Paragraph>
    <Paragraph>
      이 앱은 운동 지지리도 안 하던 제가 깔짝이라도 하게 만든 무한루프 운동
      인증방, 특히 반장님에 대한 감사의 마음으로 만들었습니다.
    </Paragraph>
    <CloseButton onClick={onClose}>닫기</CloseButton>
  </Dialog>
);

const Paragraph = styled.p`
  box-sizing: border-box;

  width: 100%;
  padding: 0 0.5rem;

  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }
`;

const CloseButton = styled(Button)`
  color: inherit;
  font-weight: normal;
`;

export default AboutDialog;
