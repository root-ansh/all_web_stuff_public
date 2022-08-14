export function TextFilter({initialText, onTextChange}) {
    return (
        <div className="filter_text">
            <input
                type="text"
                name="search_text"
                id="search_text"
                aria-label="search_text"
                placeholder="Filter By Name or Description(Enter here)"
                value={initialText}
                onChange={(e)=>onTextChange(e.target.value)}
            />
        </div>
    )
}
