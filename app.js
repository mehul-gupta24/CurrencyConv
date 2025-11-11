const URL="https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json"
const dropdowns=document.querySelectorAll(".dropdown select")
const select1=document.querySelector(".select-container-1 select")
const select2=document.querySelector(".select-container-2 select")
let message=document.querySelector(".msg")

for(let select of dropdowns){
    for(currCode in countryList){
        // console.log(code , countryList[code]);
        let newOption=document.createElement("option")
        newOption.innerText=currCode
        newOption.value=currCode
        if(select.name==="from"){
            if(currCode==="USD"){
                newOption.selected=true
            }
        }
        if(select.name==="to"){
            if(currCode==="INR"){
                newOption.selected=true
            }
        }
        select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlags(evt.target)
    })

}

function updateFlags(selectElement){
    // console.log(selectElement)
    let currCode=selectElement.value
    let countryCode=countryList[currCode]
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=selectElement.parentElement.querySelector("img")
    img.src=newSrc
}

let swap=document.querySelector("i")
swap.addEventListener("click",()=>{
    //swapping it
    let el1=document.querySelector(".select-container-1")
    let el2=document.querySelector(".select-container-2")
    let temp = document.createElement("div"); // placeholder
    el1.parentNode.insertBefore(temp, el1);
    el2.parentNode.insertBefore(el1, el2);
    temp.parentNode.insertBefore(el2, temp);
    temp.remove();
    let tempConv = conv1;
    conv1 = conv2;
    conv2 = tempConv;
    let tempCurr = from;
    from = to;
    to = tempCurr;
    button.click();
})

let entered=document.querySelector(".amount input")
let answer=document.querySelector(".answer")
let button=document.querySelector("button")

entered.addEventListener("keyup", () => {
    button.click()
});
  
button.addEventListener("click",(e)=>{
    e.preventDefault(); //prevents refreshing the page
    let enteredAmount=document.querySelector(".amount input").value
    if(enteredAmount>=0) answer.innerText=(conv2*enteredAmount/conv1).toFixed(2)
    else answer.innerText="Please enter a valid amount"
    // console.log(enteredAmount);
    console.log(message.innerText)
    message.innerText=`1 ${from} = ${(conv2/conv1).toFixed(2)} ${to}`
})
let from="USD";
let to="INR";
let conv2=90.14188919; // bydeafult inr
let conv1=1.08854773; // bydeafult usd
select1.addEventListener("change",()=>{
    for(curr in conversion["eur"]){
        from=select1.value;
        if(curr===select1.value.toLowerCase()){
            conv1=conversion["eur"][curr];
            // let valB=conversion["eur"][curr];
            // console.log(conv1)
        }
    }
    button.click();
})
select2.addEventListener("change",()=>{
    for(curr in conversion["eur"]){
        to=select2.value;
        if(curr===select2.value.toLowerCase()){
            conv2=conversion["eur"][curr];
            // let valB=conversion["eur"][curr];
            // console.log(conv2)
        }
    }
    button.click();
})