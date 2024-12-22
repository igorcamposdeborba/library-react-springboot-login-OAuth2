import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { axios } from "axios";

// hook para aplicação acessar o contexto de login
const UseAuth = () => {
    const context = useContext(AuthContext);
    return context;
}


export default UseAuth;