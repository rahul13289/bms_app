
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AddBranch.css";
import { FiPlusCircle } from "react-icons/fi";
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import API_URL from "../Config";

const AddBranch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branchCode: "",
    branchName: "",
    branchShortName: "",
    doorNo: "",
    street: "",
    pincode: "",
    locality: "",
    city: "",
    state: "",
    panno: "",
    gstin: "",
    branchType: "",
    vehicleType: [],
    branchContactNo: "",
    branchAlternaterContactNo: "",
    branchWhatsappNo: "",
    branchEmailID: "",
    inchargerName: "",
    inchargerContactNo: "",
    inchargerAlternateContactNo: "",
    inchargerWhatsappNo: "",
    inchargerEmailID: "",
    contactPersonName: "",
    contactPersonContactNo: "",
    contactPersonAlternateContactNo: "",
    contactPersonWhatsappNo: "",
    contactPersonEMailID: "",
    openingBalance: "",
    openingDate: "",
    minimumAmount: "",
    maximumAmount: "",
    monthlyMaximumAmount: "",
    maximumUnsettledAmount: "",
    effectiveDate: "",
    status: true,
    bankDetails: [
      {
        accountNumber: "",
        accountHolderName: "",
        ifscCode: "",
        bankName: "",
        branchName: "",
      },
    ],
  });


  const handleDiscard = () => {
    setFormData({
      branchCode: "",
      branchName: "",
      branchShortName: "",
      doorNo: "",
      street: "",
      pincode: "",
      locality: "",
      city: "",
      state: "",
      panno: "",
      gstin: "",
      branchType: "",
      vehicleType: [],
      branchContactNo: "",
      branchAlternaterContactNo: "",
      branchWhatsappNo: "",
      branchEmailID: "",
      inchargerName: "",
      inchargerContactNo: "",
      inchargerAlternateContactNo: "",
      inchargerWhatsappNo: "",
      inchargerEmailID: "",
      contactPersonName: "",
      contactPersonContactNo: "",
      contactPersonAlternateContactNo: "",
      contactPersonWhatsappNo: "",
      contactPersonEMailID: "",
      openingBalance: "",
      openingDate: "",
      minimumAmount: "",
      maximumAmount: "",
      monthlyMaximumAmount: "",
      maximumUnsettledAmount: "",
      effectiveDate: "",
      status: true,
      bankDetails: [
        {
          accountNumber: "",
          accountHolderName: "",
          ifscCode: "",
          bankName: "",
          branchName: "",
        },
      ],
    });

    navigate("/");
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "number" ? Number(value) : value; 
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : newValue,
    });
  };
  

  const handleBankDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBankDetails = [...formData.bankDetails];
    updatedBankDetails[index][name] = value;
    setFormData({ ...formData, bankDetails: updatedBankDetails });
  };

  const handleAddBankDetail = () => {
    setFormData({
      ...formData,
      bankDetails: [
        ...formData.bankDetails,
        {
          accountNumber: "",
          accountHolderName: "",
          ifscCode: "",
          bankName: "",
          branchName: "",
        },
      ],
    });
  };

  const handleRemoveBankDetail = (index) => {
    const updatedBankDetails = formData.bankDetails.filter((_, i) => i !== index);
    setFormData({ ...formData, bankDetails: updatedBankDetails });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    axios.post(`${API_URL}/api/branches`, formData)
      .then(res => {
        if (res.data === "success" || 201) {
          alert(
            "Your Account has been Registered Successfully!!! "
          )
          navigate("/");
        }
      })
  };

  const handleSelectAll = () => {
    setFormData({
      ...formData,
      vehicleType: allVehicleTypes,
    });
  };

  const allVehicleTypes = ["Car", "Bike", "Truck"];


  return (
    <section className="add">
      <form onSubmit={handleSubmit} >
        <h2>Manage Branch</h2>


        {/* Branch Details */}
        <h3>1. Branch Details</h3>
        <input type="text" name="branchCode" placeholder="Branch Code" value={formData.branchCode} onChange={handleChange} required />
        <input type="text" name="branchName" placeholder="Branch Name" value={formData.branchName} onChange={handleChange} required />
        <input type="text" name="branchShortName" placeholder="Branch Short Name" value={formData.branchShortName} onChange={handleChange} required />
        <input type="text" name="doorNo" placeholder="Door/Flat/House No" value={formData.doorNo} onChange={handleChange} />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
        <input type="text" name="locality" placeholder="Locality" value={formData.locality} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="panno" placeholder="PAN No" value={formData.panno} onChange={handleChange} />
        <input type="text" name="gstin" placeholder="GSTIN" value={formData.gstin} onChange={handleChange} />
        <input type="text" name="branchType" placeholder="Branch Type" value={formData.branchType} onChange={handleChange} required>
        </input>

        {/* Vehicle Type */}
        <label style={{ color: "gray", fontSize: "14px", marginLeft: "13px", marginTop: "5px" }}> Vehicle Type</label>
        <div style={{ display: "flex", marginTop: "5px" }}>
          <label >
            <input type="checkbox" onChange={handleSelectAll} checked={formData.vehicleType.length === allVehicleTypes.length} />
            Select All
          </label>
          {allVehicleTypes.map((type) => (
            <label key={type} style={{ display: "inline" }}>
              <input
                type="checkbox" name="vehicleType" value={type} checked={formData.vehicleType.includes(type)} onChange={(e) => {
                  const { value, checked } = e.target;
                  const updatedVehicleTypes = checked
                    ? [...formData.vehicleType, value]
                    : formData.vehicleType.filter((t) => t !== value);
                  setFormData({ ...formData, vehicleType: updatedVehicleTypes });
                }}
              />
              {type}
            </label>
          ))}
        </div>



        {/* Branch Contact Details */}

        <h3>2. Branch Contact Details</h3>
        <input type="text" name="branchContactNo" placeholder="Contact No" value={formData.branchContactNo} onChange={handleChange} required />
        <input type="text" name="branchAlternaterContactNo" placeholder="Alternate Contact No" value={formData.branchAlternaterContactNo} onChange={handleChange} required />
        <input type="text" name="branchWhatsappNo" placeholder="Whatsapp Number" value={formData.branchWhatsappNo} onChange={handleChange} required />
        <input type="email" name="branchEmailID" placeholder="Email Id" value={formData.branchEmailID} onChange={handleChange} required />

        {/* Branch Incharge Details */}

        <h3>3. Branch Incharge Details</h3>
        <input type="text" name="inchargerName" placeholder="Branch Incharge Name" value={formData.inchargerName} onChange={handleChange} required />
        <input type="text" name="inchargerContactNo" placeholder="Incharge Contact No" value={formData.inchargerContactNo} onChange={handleChange} required />
        <input type="text" name="inchargerAlternativeContactNo" placeholder="Alternative Contact No" value={formData.inchargeAlternativeContactNo} onChange={handleChange} required />
        <input type="text" name="inchargerWhatsappNo" placeholder="Incharge Whatsapp No" value={formData.inchargerWhatsappNo} onChange={handleChange} required />
        <input type="email" name="inchargerEmailID" placeholder="Email Id" value={formData.inchargerEmailID} onChange={handleChange} required />

        {/* Contact Person Details */}

        <h3>4. Contact Person Details</h3>
        <input type="text" name="contactPersonName" placeholder="Contact Person Name" value={formData.contactPersonName} onChange={handleChange} required />
        <input type="text" name="contactPersonContactNo" placeholder="Contact Person Contact No" value={formData.contactPersonContactNo} onChange={handleChange} required />
        <input type="text" name="contactPersonAlternateContactNo" placeholder="Alternative Contact No" value={formData.contactPersonAlternateContactNo} onChange={handleChange} required />
        <input type="text" name="contactPersonWhatsappNo" placeholder="Whatsapp No" value={formData.contactPersonWhatsappNo} onChange={handleChange} required />
        <input type="email" name="contactPersonEMailID" placeholder="Email Id" value={formData.contactPersonEMailID} onChange={handleChange} required />

        {/* Opening Details */}

        <h3>5. Opening Details</h3>
        <div className="form-group">
          <div >
            <label htmlFor="openingBalance">Opening Balance</label>
            <input type="text" name="openingBalance" placeholder="0" value={formData.openingBalance} onChange={handleChange} required />
          </div>
          <div >
            <label htmlFor="openingDate">Opening Date</label>
            <input type="date" name="openingDate" value={formData.openingDate} onChange={handleChange} required />
          </div>
        </div>

        {/* Advance Request Details */}

        <h3>6. Advance Request Details</h3>

        <input type="number" name="minimumAmount" placeholder="Minimum Amount" value={formData.minimumAmount} onChange={handleChange} required />
        <input type="number" name="maximumAmount" placeholder="Maximum Amount" value={formData.maximumAmount} onChange={handleChange} required />
        <input type="number" name="monthlyMaximumAmount" placeholder="Monthly Maximum Amount" value={formData.monthlyMaximumAmount} onChange={handleChange} required />
        <input type="number" name="maximumUnsettledAmount" placeholder="Maximum Unallocated Amount" value={formData.maximumUnsettledAmount} onChange={handleChange} required />
        <div className="form-single">
          <label htmlFor="effectiveDate">Effective Date</label>
          <input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} required />
        </div>


        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>7. Bank Details</h3>
        </div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="heading" >ACCOUNT NUMBER</th>
              <th className="heading">ACCOUNT HOLDER NAME</th>
              <th className="heading">IFSC CODE</th>
              <th className="heading">BANK NAME</th>
              <th className="heading">BRANCH NAME</th>
              <th className="heading">
                <button type="button" className="btn-add" onClick={handleAddBankDetail}>
                  <FiPlusCircle className="btn-add-1" />
                </button>
              </th>
            </tr>
          </thead>
          {formData.bankDetails.map((bankDetail, index) => (
            <tbody key={index} >
              <tr className="addbank">
                <td>
                  <input type="text" name="accountNumber" placeholder="Account Number" value={bankDetail.accountNumber} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                <td>
                  <input type="text" name="accountHolderName" placeholder="Account Holder Name" value={bankDetail.accountHolderName} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                <td>
                  <input type="text" name="ifscCode" placeholder="IFSC Code" value={bankDetail.ifscCode} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                <td>
                  <input type="text" name="bankName" placeholder="Bank Name" value={bankDetail.bankName} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                <td>
                  <input type="text" name="branchName" placeholder="Branch Name" value={bankDetail.branchName} onChange={(e) => handleBankDetailChange(index, e)} /></td>
                <td>
                  {formData.bankDetails.length > 1 && (
                    <button
                      type="button" className="btn-add"
                      onClick={() => handleRemoveBankDetail(index)}
                      style={{ marginLeft: "10px" }}
                    >
                      <RiDeleteBin6Line className="btn-delete" />
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>


        <div>

          {/* Status Toggle */}
          <h3 >
            Status:
            <input type="checkbox" name="status" checked={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.checked })} required
            />
          </h3>

          {/* Buttons */}
          <button type="button" className="btn-discard" onClick={handleDiscard}>Discard</button>



          <button className="btn-submit" type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default AddBranch;