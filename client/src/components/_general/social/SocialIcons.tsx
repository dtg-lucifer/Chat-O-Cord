import React from 'react'
import { SocialWrapper } from '../../_styled/SocialIcons'
import { 
    FaGithub,
    FaYoutube,
    FaInstagram,
    FaDiscord 
} from "react-icons/fa"

const SocialIcons = () => {
  return (
    <>
        <SocialWrapper color='#eca7ec' fDirection='column' gap='2rem' size='2.5rem'>
            <a href="https://github.com/dtg-lucifer" target="_blank" rel="noreferrer"><FaGithub/></a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><FaYoutube/></a>
            <a href="https://www.instagram.com/p_i_u_s_h_._b_o_s_e/" target="_blank" rel="noreferrer"><FaInstagram/></a>
            <a href="https://discord.gg/AUgqhYDCJy" target="_blank" rel="noreferrer"><FaDiscord/></a>
        </SocialWrapper>
    </>
  )
}

export default SocialIcons