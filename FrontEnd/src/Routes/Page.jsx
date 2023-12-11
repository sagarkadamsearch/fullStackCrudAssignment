import {Routes,Route} from 'react-router-dom';
import HomePage from '../Pages1/HomePage';
import SignupPage from '../Pages1/SignupPage';
import LoginPage from '../Pages1/LoginPage';
import PostPage from '../Pages1/PostPage';




const Page = ()=>{

    return <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/' element={<SignupPage/>}/>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/' element={<PostPage/>}/>
    </Routes>
}

export default Page;