import { useState } from "react"
export default function learn_useState(){

    const [show, setShow] = useState(false);

    // ES5
    // function showcontent(){
    //     setShow(true);
    // }

    // ES6
    const showcontent = () => {
        setShow(true);
    };

    return (
        <>
        <p>Xin chào bạn, tôi nhà Jay, nhấn xem thêm để biết thêm về tôi</p>
        {show == false ? <a href="#" onClick={showcontent}>Xem thêm</a> : '' }
        {show == true ? <p dangerouslySetInnerHTML={{__html:'Tôi sinh năm 1992, quê Gia Lai.'}} /> : ''}
        </>
    )
}