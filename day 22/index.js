document.querySelector("form").addEventListener("submit",todofun)



function todofun(event){
    event.preventDefault()
    let name = document.getElementById("task").value
    let id = document.getElementById("priority").value

    let tr = document.createElement("tr")
    let td1 = document.createElement("td")

    td1.innerHTML =name

    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    td3.innerHTML = "DELETE"
    td2.innerHTML = id

    tr.append(td1 , td2 , td3)

    document.querySelector("tbody").append(tr)
}