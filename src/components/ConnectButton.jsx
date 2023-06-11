import React from 'react';
import { StyledConnectButton } from './styles/StyledConnectButton';

const ConnectButton = ({ callback }) => (
    <StyledConnectButton onClick={callback}>Connect Wallet</StyledConnectButton>
)

export default ConnectButton;