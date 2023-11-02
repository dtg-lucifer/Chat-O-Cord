import styled from "styled-components";

export const SideBarWrapper = styled.div`
	background-color: var(--clr-dark-bg-faint);
	min-width: 20rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
	padding: 1.5rem;
`

export const TopWrapper = styled.div`
	width: 100%;
	position: relative;
	&::after {
		content: "";
		display: block;
		position: absolute;
		width: 100%;
		bottom: -30%;
		height: 1px;
		background-color: var(--clr-light-bg-faint);
	}
`

export const FilterWrapper = styled.div`
	
`

export const ChatWrapper = styled.div`
	
`