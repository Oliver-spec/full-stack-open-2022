const Filter = ({filterNames}) => {
    return (
        <p>
            filter shown with <input onChange={filterNames} />
        </p>
    )
}

export default Filter