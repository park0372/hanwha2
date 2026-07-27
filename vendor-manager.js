console.log("vendor-manager.js Loaded");
// ============================================
// Iraq Vendor Intelligence Platform
// Vendor Management Engine V1
// File: vendor-manager.js
// ============================================


// Vendor Database
const savedVendors = localStorage.getItem("vendors");
let selectedVendorIndex = null;
let vendors = savedVendors
    ? JSON.parse(savedVendors)
    : [

    {
        id: "V001",
        name: "ABC Electrical Trading",
        category: "Electrical",
        location: "Baghdad",
            contact: "Ahmed Ali",
    phone: "+964-770-123-4567",
    email: "info@abcelec.iq",
    website: "www.abcelec.iq",
        approval: "Approved",
        risk: "Low",
        score: 90,
        lastUpdate: "2026-07-26"
    },


    {
        id: "V002",
        name: "XYZ Mechanical Supplier",
        category: "Mechanical",
        location: "Basra",
            contact: "Ahmed Ali",
    phone: "+964-770-123-4567",
    email: "info@abcelec.iq",
    website: "www.abcelec.iq",
        approval: "Pending",
        risk: "Medium",
        score: 72,
        lastUpdate: "2026-07-26"
    },


    {
        id: "V003",
        name: "Iraq Steel Company",
        category: "Material",
        location: "Najaf",
            contact: "Ahmed Ali",
    phone: "+964-770-123-4567",
    email: "info@abcelec.iq",
    website: "www.abcelec.iq",
        approval: "Approved",
        risk: "High",
        score: 55,
        lastUpdate: "2026-07-26"
    }

];



// ============================================
// Search Vendor
// ============================================

const companySearch = document.getElementById("companySearch");

if (companySearch) {

    companySearch.addEventListener("input", function (e) {

        const keyword = e.target.value.trim().toLowerCase();

        if (keyword === "") {
            renderVendorTable(vendors);
            return;
        }

        const filtered = vendors.filter(v =>

            v.name.toLowerCase().includes(keyword) ||

            v.category.toLowerCase().includes(keyword) ||

            v.location.toLowerCase().includes(keyword)

        );

        renderVendorTable(filtered);

    });

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
        <td>${v.approval}</td>
        <td>${v.score}</td>
        <td>${v.lastUpdate || "-"}</td>

<td>
<button class="edit-btn"
onclick="editVendor(${index})">
✏ Edit
</button>

<button class="delete-btn"
onclick="deleteVendor(${index})">
🗑 Delete
</button>

</td>
`;
        row.style.cursor = "pointer";

row.addEventListener("click", function (e) {

    if (e.target.tagName === "BUTTON") return;

    showVendorDetail(v.id);

});

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

document.addEventListener("DOMContentLoaded", function () {

    // Vendor 목록 표시
    renderVendorTable(vendors);

    // KPI 갱신 (script.js에 함수가 있으면 실행)
    if (typeof updateVendorKPI === "function") {
        updateVendorKPI();
    }

});
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
    const contact = document.getElementById("vendorContact").value.trim();

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
          contact: contact,
        approval: status,
        risk: "Low",
        score: score,
            documents: vendors[editIndex].documents || {
        companyProfile: "",
        isoCertificate: "",
        companyRegistration: ""
    },
        lastUpdate: new Date().toLocaleDateString("ko-KR")
    };

    editIndex = -1;

}else{

vendors.push({
    id: "V" + String(vendors.length + 1).padStart(3, "0"),
    name: company,
    category: category,
    location: city,
    contact: contact,

    approval: status,
    risk: "Low",
    score: score,

    documents: {
        companyProfile: "",
        isoCertificate: "",
        companyRegistration: ""
    },

    lastUpdate: new Date().toLocaleDateString("ko-KR")
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
    document.getElementById("vendorContact").value = v.contact || "";
    document.getElementById("vendorScore").value = v.score;
    document.getElementById("vendorStatus").value = v.approval;
editIndex = index;
    modal.style.display = "flex";
}
// ============================================
// Category / Status Filter
// ============================================

const categoryFilter = document.getElementById("filterCategory");
const statusFilter = document.getElementById("filterStatus");

function applyFilters() {

    let filtered = [...vendors];

    // Category Filter
    if (categoryFilter.value !== "") {
        filtered = filtered.filter(v => v.category === categoryFilter.value);
    }

    // Status Filter
    if (statusFilter.value !== "") {
        filtered = filtered.filter(v => v.approval === statusFilter.value);
    }

    renderVendorTable(filtered);
}

categoryFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);


function showVendorDetail(vendorId) {

    const index = vendors.findIndex(v => v.id === vendorId);

    if (index === -1) return;

    selectedVendorIndex = index;

    const v = vendors[index];

    document.getElementById("detailCompany").value = v.name || "";
    document.getElementById("detailCategory").value = v.category || "";
    document.getElementById("detailCity").value = v.location || "";
    document.getElementById("detailContact").value = v.contact || "";
    document.getElementById("detailStatus").value = v.approval || "";

}
document.getElementById("saveVendorBtn").addEventListener("click", saveVendorDetail);
function saveVendorDetail() {

    if (selectedVendorIndex === null) {
        alert("먼저 Vendor를 선택하세요.");
        return;
    }

    vendors[selectedVendorIndex].name =
        document.getElementById("detailCompany").value;

    vendors[selectedVendorIndex].category =
        document.getElementById("detailCategory").value;

    vendors[selectedVendorIndex].location =
        document.getElementById("detailCity").value;
vendors[selectedVendorIndex].contact =
    document.getElementById("detailContact").value;
    vendors[selectedVendorIndex].approval =
        document.getElementById("detailStatus").value;

    // LocalStorage 저장
    localStorage.setItem("vendors", JSON.stringify(vendors));

    // 테이블 다시 그리기
    renderVendorTable(vendors);

    alert("Vendor 정보가 저장되었습니다.");
}
