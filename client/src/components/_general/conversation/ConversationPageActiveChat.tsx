import React from 'react'
import { useParams } from 'react-router-dom';
import { MainWrapper } from '../../_styled/ConversationPage';

const ConversationPageActiveChat = () => {    
    const { id } = useParams();

    return <MainWrapper>The id of ther channel is: {id}</MainWrapper>;
}

export default ConversationPageActiveChat