const MessageDisplay = ({ message }) => {

    return (
        <div className="message-display" >
            <p id="request">{message ? message.content : ""}</p>
        </div>
    )
}

export default MessageDisplay