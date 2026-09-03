import { useContext } from "react";
import AnecdoteContext from "../AnecdoteContext";

const useAnecdotesContext = () => useContext(AnecdoteContext)

export default useAnecdotesContext