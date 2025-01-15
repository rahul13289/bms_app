import React, { useEffect, useState } from 'react';
import '../Style/Home.css';
import { IoIosAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MdOutlineUpload, MdOutlineWidgets, MdOutlineZoomOutMap } from "react-icons/md";
import { ImDownload3 } from "react-icons/im";
import { Link } from "react-router-dom";
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import API_URL from '../Config';

function Home() {
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [rowsToShow, setRowsToShow] = useState(2);


  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleRowsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRowsToShow(isNaN(value) ? 0 : value);
  };

  useEffect(() => {
    axios.get(`${API_URL}/api/branches`)
      .then((res) => {
        console.log(res.data);
        setBranches(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching branches:", err);
        setBranches([]);
      });
  }, []);

  const downloadExcel = () => {
    const data = branches.map((branch, index) => ({
      "#": index + 1,
      "Branch Code": branch.branchCode,
      "Branch Name": branch.branchName,
      "Branch Short Name": branch.branchShortName,
      "Door No": branch.doorNo,
      "Street": branch.street,
      "Pincode": branch.pincode,
      "Locality": branch.locality,
      "City": branch.city,
      "State": branch.state,
      "PAN No": branch.panno,
      "GSTIN": branch.gstin,
      "Branch Type": branch.branchType,
      "Vehicle Type": branch.vehicleType.join(", "),
      "Branch Contact No": branch.branchContactNo,
      "Branch Alternater Contact No": branch.branchAlternaterContactNo,
      "Branch Whatsapp No": branch.branchWhatsappNo,
      "Branch Email ID": branch.branchEmailID,
      "Incharger Name": branch.inchargerName,
      "Incharger Contact No": branch.inchargerContactNo,
      "Incharger Alternate Contact No": branch.inchargerAlternateContactNo,
      "Incharger Whatsapp No": branch.inchargerWhatsappNo,
      "Incharger Email ID": branch.inchargerEmailID,
      "Contact Person Name": branch.contactPersonName,
      "Contact Person Phone No": branch.contactPersonContactNo,
      "Contact Person Alternate No": branch.contactPersonAlternateContactNo,
      "Contact Person Whatsapp No": branch.contactPersonAlternateContactNo,
      "Contact Person Email ID": branch.contactPersonAlternateContactNo,
      "Opening Balance": branch.openingBalance,
      "Opening Date": branch.openingDate,
      "Minimum Amount": branch.minimumAmount,
      "Maximum Amount": branch.maximumAmount,
      "Monthly Maximum Amount": branch.monthlyMaximumAmount,
      "Maximum Unsettled Amount": branch.maximumUnsettledAmount,
      "Effective Date": branch.effectiveDate,
      "Bank Details": branch.bankDetails.map(bank => `Account No: ${bank.accountNumber},Account Holder Name: ${bank.accountHolderName}, IFSC: ${bank.ifscCode}, Bank Name: ${bank.bankName},Branch Name: ${bank.branchName}`).join(" | ")
    }));


    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Branches");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Branches.xlsx");
  };

  const [columnsVisibility, setColumnsVisibility] = useState({
    hash: true,
    branchName: true,
    branchCode: true,
    branchShortName: true,
    locality: true,
    city: true,
    state: true,
    contactPerson: true,
    contactNumber: true,
    panno: true,
    gstin: true,
    status: true,
    action: true,
  });
  const columns = [
    { key: "hash", label: "#" },
    { key: "branchName", label: "Branch Name" },
    { key: "branchCode", label: "Branch Code" },
    { key: "branchShortName", label: "Branch Short Name" },
    { key: "locality", label: "Locality" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "contactPerson", label: "Contact Person" },
    { key: "contactNumber", label: "Contact Number" },
    { key: "panno", label: "PAN No" },
    { key: "gstin", label: "GSTIN" },
  ];

  const [showWidget, setShowWidget] = useState(false);


  const toggleColumnVisibility = (column) => {
    setColumnsVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const changeScreen = () => {
    setIsFullScreen(prevState => !prevState);
  };
  return (
    <section className='home'>
      <div className={`container ${isFullScreen ? 'fullscreen' : 'medium-screen'}`}>
        <div className='box-title'>
          <h1>Branch</h1>
        </div>
        <div className='icons'>
          <div className='icon-section'>
            <Link to={'/addbranch'} title="Add Branch">
              <IoIosAddCircle className="icon add-icon" />
            </Link>
            <FaSearch className="icon search-icon" />
            <input type='text' placeholder='Search.....' value={search} onChange={handleChange} />
          </div>
          <div className='icon-section'>

            {/* Import not Work */}
            <div>
              <MdOutlineUpload className="icon" />
            </div>

            {/* To Download excel */}
            <div>
              <div onClick={downloadExcel}>
                <ImDownload3 className="icon" />
              </div>

              {/* Widget Modal */}
              {showWidget && (
                <div className="widget-modal">
                  {columns.map((column, index) => (
                    <label key={index} style={{ display: "block" }}>
                      <input type="checkbox" checked={columnsVisibility[column.key]} onChange={() => toggleColumnVisibility(column.key)} />
                      {column.label}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Widget filter button */}
            <div onClick={() => setShowWidget((prev) => !prev)}>
              <MdOutlineWidgets className="icon" />
            </div>

            {/* For Screen Size change */}
            <div onClick={changeScreen} >
              <MdOutlineZoomOutMap className="icon" />
            </div>
          </div>
        </div>

        <div className='branch-table-wrapper'>
          <table className='branch-table' border={"1"}>
            <thead>
              <tr className='tr'>
                {columnsVisibility.hash && <th className='fixed-column' style={{ width: "50px" }}>#</th>}
                {columnsVisibility.branchName && <th className='fixed-column'>Branch Name</th>}
                {columnsVisibility.branchCode && <th>Branch Code</th>}
                {columnsVisibility.branchShortName && <th>Branch Short Name</th>}
                {columnsVisibility.locality && <th>Locality</th>}
                {columnsVisibility.city && <th>City</th>}
                {columnsVisibility.state && <th>State</th>}
                {columnsVisibility.contactPerson && <th>Contact Person</th>}
                {columnsVisibility.contactNumber && <th>Contact Number</th>}
                {columnsVisibility.panno && <th>PAN No</th>}
                {columnsVisibility.gstin && <th>GSTIN</th>}
                {columnsVisibility.status && <th>Status</th>}
                {columnsVisibility.action && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {branches.length > 0 ? (
                branches
                  .filter(branch => {
                    return (
                      branch.branchName?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.panno?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.gstin?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.branchCode?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.city?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.state?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.contactPersonName?.toLowerCase().includes(search.toLowerCase()) ||
                      branch.locality?.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                  .slice(0, rowsToShow)
                  .map((branch, index) => (
                    <tr key={branch.id} className='tr'>
                      {columnsVisibility.hash && <td className='fixed-column'>{index + 1}</td>}
                      {columnsVisibility.branchName && <td className='fixed-column'>{branch.branchName}</td>}
                      {columnsVisibility.branchCode && <td>{branch.branchCode}</td>}
                      {columnsVisibility.branchShortName && <td>{branch.branchShortName}</td>}
                      {columnsVisibility.locality && <td>{branch.locality}</td>}
                      {columnsVisibility.city && <td>{branch.city}</td>}
                      {columnsVisibility.state && <td>{branch.state}</td>}
                      {columnsVisibility.contactPerson && <td>{branch.contactPersonName}</td>}
                      {columnsVisibility.contactNumber && <td>{branch.contactPersonContactNo}</td>}
                      {columnsVisibility.panno && <td>{branch.panno}</td>}
                      {columnsVisibility.gstin && <td>{branch.gstin}</td>}
                      <td>
                        <p className='status-active'>Active</p>
                      </td>
                      <td className='action'>
                        <Link to={`/editBranch/${branch.branchCode}`}>
                          <MdEdit className='action' />
                        </Link>
                        <Link to={`/viewBranch/${branch.branchCode}`}>
                          <MdRemoveRedEye className='action' />
                        </Link>
                        <Link to={`/history/${branch.branchCode}`}>
                          <MdHistory className='action' />
                        </Link>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="13" style={{ textAlign: 'center' }}>
                    No branches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="no-row" style={{ margin: '10px 10px' }}>
          <label htmlFor="rows-to-show">Number of rows to display: </label>
          <input type="number" id="rows-to-show" value={rowsToShow} onChange={handleRowsChange} style={{ width: '70px', marginLeft: '10px' }} />
        </div>
      </div>
    </section>
  );
}

export default Home;

