const CodeDisplay = ({ text }) => {
    return (
        <div className="code-display">
            <div className="buttons">
                <div className="button first"></div>
                <div className="button second"></div>
                <div className="button third"></div>
            </div>
            <div className="code-output">
                <p>{text}</p>
            </div>
        </div>
    )
}

export default CodeDisplay