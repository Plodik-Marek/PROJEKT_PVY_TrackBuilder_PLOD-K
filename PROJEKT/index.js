const menuEl = document.getElementById("menu")
const newMapEl = document.getElementById("newMap")
const menu2El = document.getElementById("menu2")
const backEl = document.getElementById("back")
const gridEl = document.getElementById("grid")
const loadEl = document.getElementById("load")
const saveEl = document.getElementById("save")
const listEl = document.getElementById("list")
const listTextEl = document.getElementById("listText")

const h1El = document.getElementById("h1")
const h2El = document.getElementById("h2")


let map = []

h2El.classList.add("hidden")
saveEl.classList.add("hidden")

function createGrid(){

    gridEl.style.display = "grid"

    gridEl.innerHTML = ""

    map = []

    for(let y = 0; y < 20; y++){  //tvoří řádky

        let row = []

        for(let x = 0; x < 20; x++){  // tvoří přímo buňky

            const cell = document.createElement("div")
            cell.classList.add("cell")

            cell.dataset.x = x  // nastavování pozice x a y 
            cell.dataset.y = y

            gridEl.appendChild(cell) // přidávání do gridu

            row.push("grass")

        }

        map.push(row)

    }

}

gridEl.addEventListener("click", (e)=>{

    if(!e.target.classList.contains("cell")) return    

    const x = e.target.dataset.x    //target je prvek na který klikl uživatel a dataset slouží k ukládání vlastních dat do html prvků
    const y = e.target.dataset.y

    const type = map[x][y]

    if(type === "grass"){
        map[x][y] = "road"
        e.target.classList.add("road")
    }
    else if(type === "road"){
        map[x][y] = "water"
        e.target.classList.remove("road")
        e.target.classList.add("water")
    }
    else{
        map[x][y] = "grass"
        e.target.classList.remove("water")
    }

})


function updateMapsList(){ //logika seznamu

    listEl.innerHTML = ""

    for(let i=0;i<localStorage.length;i++){  //toto projde localStorage

        const name = localStorage.key(i)   //získá název mapy 

        const option = document.createElement("option")
        option.value = name
        option.textContent = name

        listEl.appendChild(option)

    }

}







function save(){  /* funkce pro uložení mapy */
 
const name = prompt("Zadej název mapy")
if(!name) return

localStorage.setItem(name,JSON.stringify(map)) //uložení mapy do localstorage

updateMapsList()
}



function load(){

      const name = listEl.value
    const data = localStorage.getItem(name)

    if(!data){
         alert("mapa neexistuje")
         return
    }

    map = JSON.parse(data)

    menuEl.classList.add("hidden")
    menu2El.classList.remove("hidden")

    

    

    gridEl.style.display = "grid" //zobrazení gridu 

    drawMap()
}



function drawMap(){

    gridEl.innerHTML=""

    for(let y=0;y<20;y++){

        for(let x=0;x<20;x++){

            const cell = document.createElement("div")
            cell.classList.add("cell") 

            cell.dataset.x = x //ukládání souřadnic 
            cell.dataset.y = y

            const type = map[y][x]

            if(type === "road") cell.classList.add("road")
            if(type === "water") cell.classList.add("water")

            gridEl.appendChild(cell)  // přidání buňky do HTML gridu

        }

    }

}






newMapEl.addEventListener("click", () => {

    menuEl.classList.add("hidden")
    menu2El.classList.remove("hidden")

    loadEl.classList.add("hidden")
    listEl.classList.add("hidden")

    saveEl.classList.remove("hidden")
    
    listTextEl.classList.add("hidden")

    h1El.classList.add("hidden")
    h2El.classList.remove("hidden")

    

    createGrid()

})

backEl.addEventListener("click", () => {

     menu2El.classList.add("hidden")
     menuEl.classList.remove("hidden")

    loadEl.classList.remove("hidden")
    listEl.classList.remove("hidden")

    h1El.classList.remove("hidden")
    h2El.classList.add("hidden")

    saveEl.classList.add("hidden")
    listTextEl.classList.remove("hidden")
})




saveEl.addEventListener("click",save)
loadEl.addEventListener("click",load)
updateMapsList()
