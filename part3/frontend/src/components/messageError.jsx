const MessageError =(text)=>{
    const style ={
        border: "2px solid red", 
        borderRadius: "10px", 
        backgroundColor: "lightgrey", 
        color: "red", 
        padding: "10px"
    };
    return <p style={style}>{text}</p>
}

export default MessageError;