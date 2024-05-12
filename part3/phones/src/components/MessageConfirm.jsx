const MessageConfirm = (text) => {
    const style ={
        border: "2px solid green", 
        borderRadius: "10px", 
        backgroundColor: "lightgrey", 
        color: "green", 
        padding: "10px"
    };
    return <p style={style}>{text}</p>
}

export default MessageConfirm;