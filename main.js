let form= document.getElementById("form")
let textInput=document.getElementById("textInput")
let msg=document.getElementById("msg")
let dateInput=document.getElementById("dateInput")
let textarea=document.getElementById("textarea")
let task=document.getElementById("tasks")
let add= document.getElementById("add")

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    formvalidation()
    resetform()
})

let formvalidation=()=>{
    if(textInput.value===""){
        console.log("failure")
        msg.innerHTML=`<p>The title can not be blank </p>`
    }
    else{
        console.log("failure")
        msg.innerHTML=``
        acceptdata()
        add.setAttribute("data-dismiss","modal")
        add.click();

        (()=>{
            add.setAttribute("data-dismiss","")
        })

    }
}


let data=[]

let acceptdata=()=>{

    data.push({
        text:textInput.value,
        date:dateInput.value,
        desc:textarea.value,
    });

    localStorage.setItem("data",JSON.stringify(data))

    console.log(data)
    Insertdata()
}

let Insertdata=()=>{
    task.innerHTML = "";
    data.map((x,y)=>{
        return (  task.innerHTML+=`
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.desc}</p>
    
            <span class="text-center" class="options">
                <i data-toggle="modal" data-target="#form" onClick="update(this)" class="bi bi-pencil-square"></i>
                <i onClick="deletess(this);Insertdata()" class="bi bi-trash"></i>
            </span>
    
        </div>`)
    })
    
}

let resetform=()=>{
    textInput.value=""
    dateInput.value=""
    textarea.value=""
}

let deletess=(e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data))
}

let update=(e)=>{
    let selectedtask= e.parentElement.parentElement;
    textInput.value=selectedtask.children[0].innerHTML
    dateInput.value=selectedtask.children[1].innerHTML
    textarea.value=selectedtask.children[2].innerHTML

    deletess(e)
}


(()=>{
    data=JSON.parse(localStorage.getItem("data")) || []
    Insertdata()
})()