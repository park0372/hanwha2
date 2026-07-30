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

            (v.name || "").toLowerCase().includes(keyword) ||
            (v.category || "").toLowerCase().includes(keyword) ||
            (v.location || "").toLowerCase().includes(keyword) ||
            (v.approval || "").toLowerCase().includes(keyword) ||
            (v.contact || "").toLowerCase().includes(keyword)

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
const docs = v.documents || {};

let documentCount = 0;

if (docs.companyProfile) documentCount++;
if (docs.isoCertificate) documentCount++;
if (docs.companyRegistration) documentCount++;
    row.innerHTML=`
        <td>${v.name}</td>
        <td>${v.category}</td>
        <td>${v.location}</td>
        <td>${documentCount}/3</td>
        <td>${v.approval}</td>
        <td>${v.score}</td>
        <td>${v.lastUpdate || "-"}</td>

<td>
<button class="view-btn"
onclick="showVendorDetail(${index})">
View
</button>

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

document.addEventListener("DOMContentLoaded", function () {

    // Vendor 목록 표시
    renderVendorTable(vendors);

    updateDashboard();

    // KPI 갱신 (script.js에 함수가 있으면 실행)
    if (typeof updateVendorKPI === "function") {
        updateVendorKPI();
    }
    if (typeof updateSurveyChart === "function") {
    updateSurveyChart();
}
if (typeof updateCategoryChart === "function") {
    updateCategoryChart();
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

function applyFilters() {

    const keyword = (document.getElementById("companySearch")?.value || "")
        .trim()
        .toLowerCase();

    const category = document.getElementById("filterCategory")?.value || "";
    const status = document.getElementById("filterStatus")?.value || "";

    const filtered = vendors.filter(v => {

        const matchKeyword =
            keyword === "" ||
            (v.name || "").toLowerCase().includes(keyword) ||
            (v.category || "").toLowerCase().includes(keyword) ||
            (v.location || "").toLowerCase().includes(keyword) ||
            (v.approval || "").toLowerCase().includes(keyword) ||
            (v.contact || "").toLowerCase().includes(keyword);

        const matchCategory =
            category === "" || v.category === category;

        const matchStatus =
            status === "" || v.approval === status;

        return matchKeyword && matchCategory && matchStatus;

    });

    renderVendorTable(filtered);

}

const categoryFilter = document.getElementById("filterCategory");
const statusFilter = document.getElementById("filterStatus");

if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters);
}

if (statusFilter) {
    statusFilter.addEventListener("change", applyFilters);
}


function showVendorDetail(index) {

    selectedVendorIndex = index;

    const v = vendors[index];

    if (!v) return;

    document.getElementById("detailCompany").value = v.name || "";
    document.getElementById("detailCategory").value = v.category || "";
    document.getElementById("detailCity").value = v.location || "";
    document.getElementById("detailContact").value = v.contact || "";
    document.getElementById("detailStatus").value = v.approval || "";
    document.getElementById("detailWebsite").value = v.website || "";
document.getElementById("detailEmail").value = v.email || "";
document.getElementById("detailPhone").value = v.phone || "";
document.getElementById("detailRemarks").value = v.remarks || "";

const statusDiv = document.getElementById("documentStatus");

    if (statusDiv) {

        const docs = v.documents || {};
        const uploadedCount =
    (docs.companyProfile ? 1 : 0) +
    (docs.isoCertificate ? 1 : 0) +
    (docs.companyRegistration ? 1 : 0);
        statusDiv.innerHTML = `
            <h4>Document Status (${uploadedCount}/3)</h4>

            <p>📄 Company Profile :
            ${docs.companyProfile ? "✅ " + docs.companyProfile : "❌ Not Uploaded"}</p>

            <p>📑 ISO Certificate :
            ${docs.isoCertificate ? "✅ " + docs.isoCertificate : "❌ Not Uploaded"}</p>

            <p>📜 Company Registration :
            ${docs.companyRegistration ? "✅ " + docs.companyRegistration : "❌ Not Uploaded"}</p>
        `;
    }
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
    vendors[selectedVendorIndex].phone =
    document.getElementById("detailPhone").value;

vendors[selectedVendorIndex].email =
    document.getElementById("detailEmail").value;

vendors[selectedVendorIndex].website =
    document.getElementById("detailWebsite").value;

vendors[selectedVendorIndex].remarks =
    document.getElementById("detailRemarks").value;

    // LocalStorage 저장
    localStorage.setItem("vendors", JSON.stringify(vendors));

    // 테이블 다시 그리기
    renderVendorTable(vendors);

    alert("Vendor 정보가 저장되었습니다.");
}
document.getElementById("saveDocumentBtn").addEventListener("click", saveDocuments);

function saveDocuments() {

    if (selectedVendorIndex === null) {
        alert("먼저 Vendor를 선택하세요.");
        return;
    }

    const vendor = vendors[selectedVendorIndex];

    if (!vendor.documents) {
        vendor.documents = {};
    }

    const profile = document.getElementById("companyProfile").files[0];
    const iso = document.getElementById("isoCertificate").files[0];
    const registration = document.getElementById("companyRegistration").files[0];

    if (profile) {
        vendor.documents.companyProfile = profile.name;
    }

    if (iso) {
        vendor.documents.isoCertificate = iso.name;
    }

    if (registration) {
        vendor.documents.companyRegistration = registration.name;
    }

    localStorage.setItem("vendors", JSON.stringify(vendors));

    alert("Documents saved successfully.");
}
function updateDashboard() {

    const total = vendors.length;

    const approved = vendors.filter(v => v.approval === "Approved").length;

    const pending = vendors.filter(v => v.approval === "Pending").length;

    // 현재는 Approved를 Survey Completed로 사용
    const reviewed = approved;

    document.getElementById("totalVendor").textContent = total;
    document.getElementById("reviewVendor").textContent = reviewed;
    document.getElementById("pendingVendor").textContent = pending;
    document.getElementById("approvedVendor").textContent = approved;

}
// ============================================
// Export Vendor List (CSV)
// ============================================

document.getElementById("exportExcelBtn").addEventListener("click", exportVendorCSV);

function exportVendorCSV() {

    const headers = [
        "Company",
        "Category",
        "City",
        "Contact",
        "Phone",
        "Email",
        "Website",
        "Status",
        "Last Update"
    ];

    const rows = vendors.map(v => [
        v.name || "",
        v.category || "",
        v.location || "",
        v.contact || "",
        v.phone || "",
        v.email || "",
        v.website || "",
        v.approval || "",
        v.lastUpdate || ""
    ]);

    const csv = [
        headers.join(","),
        ...rows.map(row => row.map(value => `"${value}"`).join(","))
    ].join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "Vendor_List.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}
// ============================================
// Import Vendor List (CSV)
// ============================================

document.getElementById("importVendorFile")
.addEventListener("change", importVendorCSV);

function importVendorCSV(event) {

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {

        const text = e.target.result;

        const lines = text.split(/\r?\n/);

        if (lines.length <= 1) return;

        for (let i = 1; i < lines.length; i++) {

            if (!lines[i].trim()) continue;

            const cols = lines[i]
                .split(",")
                .map(v => v.replace(/"/g, "").trim());

            vendors.push({

                id: "V" + Date.now() + i,

                name: cols[0] || "",

                category: cols[1] || "",

                location: cols[2] || "",

                contact: cols[3] || "",

                phone: cols[4] || "",

                email: cols[5] || "",

                website: cols[6] || "",

                approval: cols[7] || "Pending",

                lastUpdate: cols[8] || new Date().toISOString().split("T")[0]

            });

        }

        localStorage.setItem("vendors", JSON.stringify(vendors));

        renderVendorTable();
        updateVendorKPI();

        if (typeof updateSurveyChart === "function")
            updateSurveyChart();

        if (typeof updateCategoryChart === "function")
            updateCategoryChart();

        alert("Vendor List Imported Successfully.");

    };

    reader.readAsText(file);

}
