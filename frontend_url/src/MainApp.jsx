
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Redirect from "./Redirect";
export default function MainApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/:shortUrl" element = {<Redirect/>}/>
            </Routes>
        </BrowserRouter>
    )
}