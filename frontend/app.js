const API_URL = "http://127.0.0.1:8001/jokes/"

async function loadData() {
    try {
        const response = await  fetch(API_URL)
        const data = await response.json()

        console.log(data)
        
        const list = document.getElementById("joke-list")
        list.innerHTML = ""
        
        data.forEach((element, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${element.setup} - ${element.punchline}`;


            //Delete Button
            const btn = document.createElement("button");
            btn.style.marginLeft = "10px" 
            btn.style.color = "red" 
            btn.style.cursor = "pointer" 
            btn.innerText = "X"

            btn.addEventListener("click", async () => {
                await deleteJoke(index)
            })


            li.appendChild(btn)
            list.appendChild(li);
        });
    }
    catch { 
        console.log("failed to load data") 

    }
}

async function submitJoke(event){
    const setup = document.getElementById("setup").value
    const punchline = document.getElementById("punchline").value

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                setup:setup, 
                punchline: punchline
            })
        })
        document.getElementById("joke-form").reset()
        loadData()
    } catch {
        console.log("Failed to post")
    }
}


async function deleteJoke(id) {
    try {
        await fetch(`${API_URL}${id}`, {
            method : "DELETE"
        })
        loadData();
        
    } catch {
        console.log("Failed to delete joke")
    }
    
}

document.getElementById("joke-form").addEventListener("submit", submitJoke)

loadData()