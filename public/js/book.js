async function addBook(event){
    event.preventDefault()

    const title = document.querySelector("#book-input").value 
    const author = document.querySelector("#author-input").value

    const response = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify({title, author}),
        headers: {"Content-Type": "application/json"}
    })

    if(response.ok){
        document.location("/")
    } else {
        alert("No book was added")
    }
}

document.querySelector("#book-form").addEventListener("submit", addBook)