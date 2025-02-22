import React, { useState } from "react";
import styled from "styled-components";
import messageIcon from "../assets/images/messageIcon.svg";

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 263px;
  height: 69px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
`;

const ChatBubble = styled.div<{ $isVisible: boolean }>`
  background: white;
  border: 2px solid #d71e0e;
  border-radius: 24px;
  padding: 12px 20px;
  position: relative;
  display: ${(props) => (props.$isVisible ? "flex" : "none")};
  flex-direction: column;
  flex: 1;

  &:after {
    content: "";
    position: absolute;
    right: -18px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 0 12px 18px;
    border-color: transparent transparent transparent #d71e0e;
  }

  &:before {
    content: "";
    position: absolute;
    right: -14px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 16px;
    border-color: transparent transparent transparent white;
    z-index: 1;
  }
`;

const ChatMessage = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ChatSubtext = styled.div`
  color: #98a9bc;
  font-size: 14px;
  font-weight: 400;
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #d71e0e;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
`;

const MessageIcon = styled.img`
  width: 24px;
  height: 24px;
`;

interface ChatWidgetProps {
  defaultVisible?: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ defaultVisible = false }) => {
  const [isMessageVisible, setMessageVisible] = useState(defaultVisible);

  return (
    <ChatContainer>
      <ChatBubble $isVisible={isMessageVisible}>
        <ChatMessage>Hi, I'm Adanna</ChatMessage>
        <ChatSubtext>How may I help you?</ChatSubtext>
      </ChatBubble>
      <IconContainer onClick={() => setMessageVisible(!isMessageVisible)}>
        <MessageIcon src={messageIcon} alt="Chat" />
      </IconContainer>
    </ChatContainer>
  );
};

export default ChatWidget;
