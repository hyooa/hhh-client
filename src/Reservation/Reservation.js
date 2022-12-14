import React, {useEffect, useState} from 'react';
import './style.css'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file 
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getdate } from '../modules/booking';
import { API_URL } from '../config/amuguna';



const Reservation = () => {


    const location = useLocation();
    const roomd = location.state;
    var img = [];
    img.push(roomd.imgurl.split(","))
    console.log(img[0])
    // console.log(roomd.rname);

const [state, setState] = useState({
    startDate:new Date(),
    endDate: new Date(),
    key: 'selection'
})
const onRangeChange = (ranges)=>{
    console.log(ranges['selection'].startDate);
    console.log(ranges['selection'].endDate);
    setState({
        startDate: ranges['selection'].startDate,
        endDate: ranges['selection'].endDate,
        key:ranges['selection'].key
    })
}
const sDay = {
    year:state.startDate.getFullYear(),
    month: state.startDate.getMonth() + 1,
    day: state.startDate.getDate()
};
const eDay = {
    year1:state.endDate.getFullYear(),
    month1: state.endDate.getMonth() + 1,
    day1: state.endDate.getDate()
};
useEffect(() => {
setFormData({
    ...formData,
    rsdate : `${sDay.year}-${sDay.month}-${sDay.day}`,
    edate : `${eDay.year1}-${eDay.month1}-${eDay.day1}`
})
},[state])

const [formData, setFormData] = useState({
    rname: roomd.rname,
    radd: roomd.radd,
    rsdate: "",
    edate : "",
    rbooker: "",
    rid : sessionStorage.getItem("user_id"),
    rphone : "",
    price : roomd.price,
    imgurl : img[0][0]
})

    const onChange=(e)=>{
        console.log(formData);
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
    })
};


const {data,loading,error} = useSelector(state=>state.booking.book); 
const dispatch = useDispatch();
useEffect(()=>{
    dispatch(getdate(roomd.rname))
},[dispatch])
    
const onSubmit = (e)=>{
    e.preventDefault();
    // console.log(formData);
            insertbooking();
    }
    function insertbooking(){
        axios.post(`${API_URL}/addbooking`,formData)
        .then(result=>{
            console.log(result);
            // document.location.href = '/Booking'
        })
        .catch(e=>{
            console.log(e);
        })
    }

    // const minimumDate = new Date(2022,5,10);
    // const maximumDate = new Date(2022,9,10);
    if(loading) return <div>????????? ??????????????????..????</div>
    if(error) return <div>????????????.. ??????????????? ??????????????????</div>
    if(!data) return <div>????????? ???????????? ??????..</div>
    // console.log(data)
    const sdata = []
    const edata =[]
    const ssdata = []
    const eedata =[]
    let answer1 = []
    // ????????? ????????????
    data.map(data=>(
   sdata.push(data.rsdate.substring(0,10)),
   edata.push(data.edate.substring(0,10))
))
        // 2022-07-20 ?????? ?????????
        sdata.map(data=>(
            ssdata.push( data.replace(/-/gi,','))
        ))
        edata.map(data=>(
            eedata.push( data.replace(/-/gi,','))
        ))
            // 2022,07,20 ?????? ??????

            edata.length = 0;
            sdata.length = 0;
     
ssdata.map(data=>(
    sdata.push(data.substring(8,10))
    ))            
eedata.map(data=>(
   edata.push(data.substring(8,10))
))
// ?????? ?????? 2?????? ?????????

function solution(x,y){
    let answer = [];
    for(let l=0; l<y.length; l++){
        var arr = []
        for(let i=Number(x[l])+1; i<Number(y[l])+3; i++){  
                arr.push(i)
                console.log(i)
        }
        answer[l] = arr;
    }
    return answer;
}
answer1 = solution(sdata,edata)
// ???????????? ???????????? ?????? ?????????

edata.length = 0;
sdata.length = 0;
eedata.length = 0;
ssdata.length = 0;
//???????????????

data.map(data=>(
    sdata.push(data.rsdate.substring(0,8)),
    edata.push(data.edate.substring(0,8))
 ))
// 2022-07- ????????? ?????????.

 sdata.map(data=>(
    ssdata.push( data.replace(/-/gi,','))
))
edata.map(data=>(
    eedata.push( data.replace(/-/gi,','))
))
// 2022,07, ?????? ????????????


var newArr = [] 
for(let l=0; l<sdata.length; l++){
    for(let i=0; i<answer1[l].length; i++){  
            newArr.push(ssdata[l]+answer1[l][i])
    }
}
// push??? ???????????? ,???????????? ????????? ??????????????? 2022,07, ??? ???????????? sdata???????????? ?????? ??????
// ??? ?????? ????????? ????????? answer1 ??? ????????????. 2022,07, ?????? answer?????? 18,19,20 ??? 3??? ????????? 

const disabledDays = [
        ]
        for(let i=0; i<newArr.length-1; i++){
            disabledDays.push(new Date(newArr[i]))
        }
// ????????? ?????? ????????????
    return (
   
        <div class="ReserWrap">
            
                <p>?????? ??????</p>
        <div id="Reservation">
            <div className="reser_left_img"><img src={`${API_URL}/img/${img[0][0]}`} alt="" /></div>
            <form onSubmit={onSubmit}>
            <div className="right">
                ???????????????
                <div class="calendar">
                <DateRange 
                    onChange={onRangeChange}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    preventSnapRefocus={false}
                    ranges={[state]}
                    // minDate={minimumDate}
                    // maxDate={maximumDate}
                    disabledDates={disabledDays}
                    
                  />       
                </div>

                <div class="input">
                <table>
                    <tr>
                        <th>Name</th>
                        <td>{roomd.rname}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{roomd.radd}</td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>{roomd.price}</td>
                    </tr>
                    <tr>
                            <th>??????????????????</th>
                            <td>{roomd.minp}/{roomd.maxp}(???)</td>
                        </tr>
                    <tr>
                        <th>Booker</th>
                        <td><input type="text" name="rbooker"  onChange={onChange} placeholder="??????????????? ??????????????????"/></td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td><input type="text" name="rphone"  onChange={onChange} placeholder="??????????????? ??????????????????"/></td>
                    </tr>
                    <tr>
                        <td colspan={2}>
                            <button >????????????</button>
                            <button>??????</button>
                        </td>
                    </tr>
                </table>
                </div>
            </div>
            </form>
        </div>
        </div>
    );
};

export default Reservation;