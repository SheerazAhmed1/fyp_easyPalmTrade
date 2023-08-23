
import { useState,useEffect } from "react";
import tickmark from "../../images/tickmark.png";
import {Link ,useParams} from "react-router-dom"
import axios from "axios";
import styles from "./style.css";

const EmailVerify=()=>{
    const[validurl,setvalidurl] =useState(false);
    const params =useParams();
    useEffect(()=>{
        const verifyEmailUrl = async()=>{
            try{
                const url=`/api/v1/users/${params.id}/verify/${params.token}`;
                const data = await axios.get(url);
                console.log(data);
                setvalidurl(true);
                console.log("valid url: " ,validurl);


            }catch(e){
                console.log(e,"error caught");
                setvalidurl(false);
            }
        }

        verifyEmailUrl();
    },[params]);

    return (
        <>
            {validurl ?(
                    <div className={styles.container}>
                        <img width="20%" height="20%"  src={tickmark} alt="success img" className={styles.success_img} />
                        <h1>Email has been verified successfully</h1>
                        <Link to="/login">
                            <button className={styles.greenbtn} >Login</button>
                        </Link>
                    </div>
                )
                :
                (
                    <h1>404 Not Found an page is Active </h1>
                )

            }

        </>
    )
}

export default EmailVerify;
