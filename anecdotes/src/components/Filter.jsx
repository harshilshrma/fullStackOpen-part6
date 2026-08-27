import { useAnecdotesActions } from "../store"

const Filter = () => {
    const { updateFilter } = useAnecdotesActions()
    const style = { marginBottom: 10 }
    
    const handleChange = (event) => {
        updateFilter(event.target.value)
    }
    
    return (
        <div style={style}>
            Filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter