// ============================================
// Iraq Vendor Intelligence Platform
// Vendor Management Engine V1
// File: vendor-manager.js
// ============================================


// Vendor Database
let vendors = [

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

function renderVendorTable(data) {


    const table =
        document.getElementById(
            "vendorTable"
        );


    if(!table) {
        return;
    }


    table.innerHTML = "";


    data.forEach(v => {


        table.innerHTML += `

        <tr>

            <td>${v.id}</td>

            <td>${v.name}</td>

            <td>${v.category}</td>

            <td>${v.location}</td>

            <td>${v.approval}</td>

            <td>${v.risk}</td>

            <td>${v.score}</td>

        </tr>

        `;


    });


}



// ============================================
// Initial Load
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        renderVendorTable(vendors);

    }
);
/* ==========================================
   Vendor Modal
========================================== */

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

    alert("Next Step : Vendor Save Function");

    modal.style.display = "none";

});
