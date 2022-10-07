import React from 'react';
import { useParams } from 'react-router-dom';
import { PanelHeaderProps } from '../../../../types/ComponentProps/ConversationPanel';
import { MainWrapper } from '../../../_styled/ConversationPage';
import ConversationPanelHeader from './ConversationPanelHeader';

const ConversationPageActiveChat:React.FC<PanelHeaderProps> = (headerProps) => {    
    const { id } = useParams();
    console.log(id)

    return <MainWrapper>
        <ConversationPanelHeader {...headerProps} />
    </MainWrapper>;
}

export default ConversationPageActiveChat