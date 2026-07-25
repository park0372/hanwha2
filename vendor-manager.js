// ============================================
// Iraq Vendor Intelligence Platform
// Vendor Management Engine V1
// File: vendor-manager.js
// ============================================


// Vendor Database
const savedVendors = localStorage.getItem("vendors");

let vendors = savedVendors
    ? JSON.parse(savedVendors)
    : [

    {
        id: "V001",
        name: "ABC Electrical Trading",
        category: "Electrical",
        location: "Baghdad",
        approval: "Approved",
        risk: "Low",
        score: 90
    },


    {
        id: "V002",
        name: "XYZ Mechanical Supplier",
        category: "Mechanical",
        location: "Basra",
        approval: "Pending",
        risk: "Medium",
        score: 72
    },


    {
        id: "V003",
        name: "Iraq Steel Company",
        category: "Material",
        location: "Najaf",
        approval: "Approved",
        risk: "High",
        score: 55
    }

];



// ============================================
// Vendor Search
// ============================================

function searchVendor(keyword) {

    return vendors.filter(v =>
        v.name
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );

}



// ============================================
// Category Filter
// ============================================

function filterCategory(category) {

    if(category === "ALL") {
        return vendors;
    }


    return vendors.filter(v =>
        v.category === category
    );

}



// ============================================
// Risk Filter
// ============================================

function filterRisk(level) {

    if(level === "ALL") {
        return vendors;
    }


    return vendors.filter(v =>
        v.risk === level
    );

}



// ============================================
// Approval Filter
// ============================================

function filterApproval(status) {

    if(status === "ALL") {
        return vendors;
    }


    return vendors.filter(v =>
        v.approval === status
    );

}



// ============================================
// Dashboard KPI
// ============================================

function vendorKPI() {

    return {

        total:
            vendors.length,


        approved:
            vendors.filter(
                v => v.approval === "Approved"
            ).length,


        pending:
            vendors.filter(
                v => v.approval === "Pending"
            ).length,


        highRisk:
            vendors.filter(
                v => v.risk === "High"
            ).length

    };

}



// ============================================
// Render Vendor Table
// ============================================

function renderVendorTable(data){

    const tbody = document.getElementById("vendorTable");

    if(!tbody) return;

    tbody.innerHTML = "";

    data.forEach((v,index)=>{

    const row=document.createElement("tr");

    row.innerHTML=`
        <td>${v.name}</td>
        <td>${v.category}</td>
        <td>${v.location}</td>
        <td>${v.score}</td>
        <td>${v.approval}</td>

        <td>
            <button class="edit-btn"
                onclick="editVendor(${index})">
                Edit
            </button>

            <button class="delete-btn"
                onclick="deleteVendor(${index})">
                Delete
            </button>
        </td>
    `;

    tbody.appendChild(row);

});

    // KPI 자동 갱신
    if(typeof updateVendorKPI==="function"){
        updateVendorKPI();
    }

}



// ============================================
// Initial Load
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        

    }
);
/* ==========================================
   Vendor Modal
========================================== */
let editIndex = -1;
const modal = document.getElementById("vendorModal");

const addVendorBtn = document.getElementById("addVendorBtn");

const closeModal = document.getElementById("closeModal");

const saveVendor = document.getElementById("saveVendor");

/* Open */

addVendorBtn.addEventListener("click", () => {

    modal.style.display = "flex";

});

/* Close */

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

/* Close when clicking outside */

window.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});

/* Save */

saveVendor.addEventListener("click", () => {

    const company = document.getElementById("vendorCompany").value.trim();
    const category = document.getElementById("vendorCategory").value.trim();
    const city = document.getElementById("vendorCity").value.trim();
    const score = Number(document.getElementById("vendorScore").value);
    const status = document.getElementById("vendorStatus").value;

if(company===""){
    alert("Company Name is required.");
    return;
}

if(editIndex >= 0){

    vendors[editIndex] = {
        id: vendors[editIndex].id,
        name: company,
        category: category,
        location: city,
        approval: status,
        risk: "Low",
        score: score
    };

    editIndex = -1;

}else{

    vendors.push({
        id: "V" + String(vendors.length + 1).padStart(3,"0"),
        name: company,
        category: category,
        location: city,
        approval: status,
        risk: "Low",
        score: score
    });

}

renderVendorTable(vendors);
updateVendorKPI();

// LocalStorage 저장
    console.log("Before Save", vendors);
localStorage.setItem("vendors", JSON.stringify(vendors));
alert("LocalStorage Saved!");
    document.getElementById("vendorCompany").value="";
    document.getElementById("vendorCategory").value="";
    document.getElementById("vendorCity").value="";
    document.getElementById("vendorScore").value="";

    modal.style.display="none";
});
// ============================================
// Delete Vendor
// ============================================

function deleteVendor(index){

    if(!confirm("Delete this vendor?")){
        return;
    }

vendors.splice(index,1);

renderVendorTable(vendors);

// LocalStorage 저장
localStorage.setItem("vendors", JSON.stringify(vendors));

}
function editVendor(index){

    const v = vendors[index];

    document.getElementById("vendorCompany").value = v.name;
    document.getElementById("vendorCategory").value = v.category;
    document.getElementById("vendorCity").value = v.location;
    document.getElementById("vendorScore").value = v.score;
    document.getElementById("vendorStatus").value = v.approval;
editIndex = index;
    modal.style.display = "flex";
}

