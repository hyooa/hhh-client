import React from 'react';
import {Link} from 'react-router-dom';
import Search from '../Search/Search';

const Header = () => {

    //검색창 클릭하면 나오게 하기
    function searchPopUp(){
        console.log('검색창 popup 띄우기');
        document.querySelector('#Search').classList.toggle('popup');
    }
    return (
        <div id="header">
            <h1><a href='/'><img src="/image/logo.png" alt=''/></a></h1>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li onClick={()=>searchPopUp()}>Search</li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/join'>Join</Link></li>
                    <li><Link to='/room'>숙소 등록</Link></li>
                    <li><Link to='/Booking'>Reservation</Link></li>
                </ul>
            </nav>
            <Search/>
        </div>
    );
};

export default Header;