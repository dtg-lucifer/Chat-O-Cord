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
	padding: 1rem .5rem;
`

export const TopWrapper = styled.div`
	width: 100%;
	position: relative;
	padding: 0 .5rem;
	&::after {
		content: "";
		display: block;
		position: absolute;
		width: calc(100% - .5rem);
		bottom: -30%;
		left: 50%;
		translate: -50%;
		height: 1px;
		background-color: var(--clr-light-bg-faint);
	}
`

export const FilterWrapper = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: .5rem;

	& > button {
		width: 100%;
	}
`

export const ChatWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;
	flex: 1;
	overflow-y: scroll;
	gap: .5rem;
	padding: 0 .5rem;
`

export const ChatCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: .5rem;
	width: 100%;
	padding: .4rem .3rem;
	border-radius: 5px;
	cursor: pointer;

	& > img {
		aspect-ratio: 1 / 1;
		object-fit: cover;
		height: 2.5rem;
		border-radius: 50%;
		outline: 2px solid var(--clr-sts-light);
		outline-offset: 2px;
	}

	& > div.details__wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: .2rem;
		flex: 1;

		& > h4 {
			font-size: 15px;
			font-weight: 600;
			color: var(--clr-light-bg);
			width: 100%;
		}

		& > p { 
			width: 100%;
			font-size: 12px;
			font-weight: 500;
			color: #bbbbbb;
		}
	}

	&:hover {
		background-color: #333333;
	}
`