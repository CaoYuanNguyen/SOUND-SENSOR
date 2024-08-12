import {useEffect, useState} from "react"
import axios from 'axios'

export function Components(props){

    const [value, setValue] = useState({})
    
    useEffect(()=>{
        console.log(value);
        
    },[value])

    function getData() {
        axios.get("http://localhost:8000/getdata")
        .then((response)=>{
            setValue(response.data)  
        });
    }

    setInterval(()=>{
        getData()
    },100)

    return(
        <div style={{width:"100vw",height:"100vh", backgroundColor:"#FFD9D9"}}>
            <div style={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
                <div style={{width:"402px", height:"65px", marginTop:"80px", margin:"0 auto", marginTop:"120px"}}>
                    <p style={{width:"402px", height:"65px",fontSize:"42px", textAlign:"center"}}>SOUND SENSOR</p>
                </div>
                <div style={{width:"1056px", height:"289px", display:"flex", flexDirection:"row",justifyContent:"center", alignItems:"center", marginTop:"184px", marginLeft:"190px"}}>
                    <div style={{width:"210px", height:"289px", display:"flex", flexDirection:"column"}}>
                        <button  style={value=="low"?{width:"210px", height:"235px", border:"0.5px solid #333", backgroundColor:"green"}:{width:"210px", height:"235px", border:"0.5px solid #333"}}>

                        </button>
                        <div style={{width:"73px", height:"29px", margin:"0 auto"}}>
                            <p style={{width:"73px", height:"29px", fontSize:"24px", textAlign:"center"}}>LOW</p>
                        </div>
                    </div>
                    <div style={{width:"210px", height:"289px", display:"flex", flexDirection:"column", marginLeft:"200px"}}>
                        <button  style={value=="medium"?{width:"210px", height:"235px", border:"0.5px solid #333", backgroundColor:"yellow"}:{width:"210px", height:"235px", border:"0.5px solid #333"}}>
                            
                        </button>
                        <div style={{width:"73px", height:"29px", margin:"0 auto"}}>
                            <p style={{width:"73px", height:"29px", fontSize:"24px", textAlign:"center"}}>MEDIUM</p>
                        </div>
                    </div>
                    <div style={{width:"210px", height:"289px", display:"flex", flexDirection:"column", marginLeft:"200px"}}>
                        <button  style={value=="high"?{width:"210px", height:"235px", border:"0.5px solid #333", backgroundColor:"red"}:{width:"210px", height:"235px", border:"0.5px solid #333"}}>
                        
                        </button>
                        <div style={{width:"73px", height:"29px", margin:"0 auto"}}>
                            <p style={{width:"73px", height:"29px", fontSize:"24px", textAlign:"center"}}>HIGH</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )




}


