import { useContext } from "react"
import { SocketContext } from "../context/socketContext"

export const useSocket = () => {
	return useContext(SocketContext)
}