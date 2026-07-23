const companies = [
{
    company:"Al Rashid Construction",
    category:"Civil",
    city:"Baghdad",
    score:92,
    status:"Approved"
},
{
    company:"Baghdad Electric",
    category:"Electrical",
    city:"Baghdad",
    score:84,
    status:"Survey"
},
{
    company:"Iraq MEP",
    category:"Mechanical",
    city:"Basra",
    score:88,
    status:"Review"
},
{
    company:"Modern Steel",
    category:"Steel",
    city:"Karbala",
    score:76,
    status:"Pending"
},
{
    company:"Al Noor Co.",
    category:"Architecture",
    city:"Erbil",
    score:95,
    status:"Approved"
}
];


/* ===========================
   Recent Companies
=========================== */

const recentBox = document.getElementById("recentCompanies");

companies.forEach(c=>{

const card=document.createElement("div");

card.className="recent-card";

card.innerHTML=`
<h4>${c.company}</h4>
<p>${c.category}</p>
<span>${c.city}</span>
`;

recentBox.appendChild(card);

});


/* ===========================
   News
=========================== */

const news=[

"NCEC continues contractor qualification program",

"Baghdad housing project preparation resumed",

"Steel price remains stable",

"New infrastructure package announced",

"Electricity sector investment discussion"

];

const newsList=document.getElementById("newsList");

news.forEach(n=>{

const li=document.createElement("li");

li.textContent=n;

newsList.appendChild(li);

});


/* ===========================
   Survey Progress Chart
=========================== */

const ctx=document.getElementById("surveyChart");

new Chart(ctx,{

type:"doughnut",

data:{

labels:[
"Approved",
"Review",
"Pending",
"Survey"
],

datasets:[{

data:[695,132,74,344],

borderWidth:0

}]

},

options:{

responsive:true,

plugins:{

legend:{
position:"bottom"
}

}

}

});


/* ===========================
   Search
=========================== */

const search=document.getElementById("companySearch");

search.addEventListener("keyup",function(){

const keyword=this.value.toLowerCase();

const rows=document.querySelectorAll("#companyTable tbody tr");

rows.forEach(row=>{

const text=row.innerText.toLowerCase();

row.style.display=text.includes(keyword)
?""
:"none";

});

});


/* ===========================
   Dashboard Search
=========================== */

const topSearch=document.getElementById("searchBox");

topSearch.addEventListener("keyup",()=>{

console.log("Searching :",topSearch.value);

});


console.log("IVIP V1.1 Loaded Successfully");
