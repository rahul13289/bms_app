import React, { useEffect, useState } from 'react';
import '../Style/ViewBranch.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../Config';

export default function ViewBranch() {

    const { branchCode } = useParams();
    const [branch, setBranch] = useState([]);
    console.log(branchCode);
    useEffect(() => {
        if (branchCode) {
            axios.get(`${API_URL}/api/branches/${branchCode}`)
                .then((response) => {
                    setBranch(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching branch data:', error);
                });
        }
    }, [branchCode]);

    return (
        <section>

            <div className='view-section'>
                <h2>Branch View</h2>
                <div className='branch-details'>
                    <h3>1.Branch Details</h3>
                    <table className='table-1'>
                        <div className='table-row'>
                            <tr>
                                <th>Branch Name :</th>
                                <td>{branch.branchName}</td>
                            </tr>
                            <tr>
                                <th>Shot Name :</th>
                                <td>{branch.branchShortName}</td>
                            </tr>
                            <tr>
                                <th>Street : </th>
                                <td >{branch.street}</td>
                            </tr>
                            <tr>
                                <th>City :</th>
                                <td>{branch.city}</td>
                            </tr>
                            <tr>
                                <th>PinCode :</th>
                                <td>{branch.pincode}</td>
                            </tr>
                            <tr>
                                <th>GSTIN : </th>
                                <td>{branch.gstin}</td>
                            </tr>
                        </div>
                        <div className='table-row'>
                            <tr>
                                <th>Branch Code :</th>
                                <td>{branch.branchCode}</td>
                            </tr>
                            <tr>
                                <th>Locality : </th>
                                <td>{branch.locality}</td>
                            </tr>
                            <tr>
                                <th>Door No :</th>
                                <td>{branch.doorNo}</td>
                            </tr>
                            <tr>
                                <th>State :</th>
                                <td>{branch.state}</td>
                            </tr>
                            <tr>
                                <th>PAN No :</th>
                                <td>{branch.panno}</td>
                            </tr>
                            <tr>
                                <th>Branch Type : </th>
                                <td>{branch.branchType}</td>
                            </tr>
                        </div>
                    </table>
                    <hr />
                    <h3>2.Branch Contact Details</h3>
                    <table className='table-2'>
                        <div className='table-row'>
                            <tr>
                                <th>Contact No : </th>
                                <td>{branch.branchContactNo}</td>
                            </tr>
                            <tr>
                                <th>Whatsapp No : </th>
                                <td>{branch.branchWhatsappNo}</td>
                            </tr>
                        </div>
                        <div className='table-row'>
                            <tr>
                                <th>Alternate No : </th>
                                <td>{branch.branchAlternaterContactNo}</td>

                            </tr>
                            <tr>
                                <th>Email-ID : </th>
                                <td>{branch.branchEmailID}</td>
                            </tr>
                        </div>
                    </table>
                    <hr />
                    <h3>3.Branch Incharge Details</h3>
                    <table className='table-3'>
                        <div className='table-row'>
                            <tr>
                                <th>Incharge Name : </th>
                                <td>{branch.inchargerName}</td>
                            </tr>
                            <tr>
                                <th>Alternate No : </th>
                                <td>{branch.branchAlternaterContactNo}</td>
                            </tr>
                            <tr>
                                <th>Email-ID : </th>
                                <td>{branch.inchargerEmailID}</td>
                            </tr>
                        </div>
                        <div className='table-row'>
                            <tr>
                                <th>Contact No : </th>
                                <td>{branch.inchargerContactNo}</td>
                            </tr>

                            <tr>

                                <th>Whatsapp No : </th>
                                <td>{branch.inchargerWhatsappNo}</td>
                            </tr>
                        </div>
                    </table>
                    <hr />
                    <h3>4.Contact Person Details</h3>
                    <table className='table-4'>
                        <div className='table-row'>
                            <tr>
                                <th>Contact Person Name : </th>
                                <td>{branch.contactPersonName}</td>
                            </tr>
                            <tr>
                                <th>Alternate No : </th>
                                <td>{branch.contactPersonAlternateContactNo}</td>
                            </tr>
                            <tr>
                                <th>Email-ID : </th>
                                <td>{branch.contactPersonEMailID}</td>
                            </tr>
                        </div>
                        <div className='table-row'>
                            <tr>
                                <th>Contact No : </th>
                                <td>{branch.contactPersonContactNo}</td>
                            </tr>
                            <tr>
                                <th>Whatsapp No : </th>
                                <td>{branch.contactPersonWhatsappNo}</td>
                            </tr>
                        </div>
                    </table>
                    <hr />
                    <h3>5.Opening Details</h3>
                    <table className='table-5'>
                        <div className='table-row'>
                            <tr>
                                <th>Date : </th>
                                <td>{branch.openingDate}</td>
                            </tr>
                        </div>
                        <div className='table-row'>
                            <tr>
                                <th>Amount : </th>
                                <td>{branch.openingBalance}</td>
                            </tr>
                        </div>
                    </table>
                    <hr />
                    <h3>6.Advance Request Details</h3>
                    <table className='table-6'>
                        <div className="table-row">
                            <tr>
                                <th>Minimum Amount : </th>
                                <td>{branch.minimumAmount}</td>
                            </tr>
                            <tr>
                                <th>Monthly Max Amount : </th>
                                <td>{branch.monthlyMaximumAmount}</td>
                            </tr>
                            <tr>
                                <th>Effective Date : </th>
                                <td>{branch.effectiveDate}</td>
                            </tr>
                        </div>
                        <div className="table-row">
                            <tr>
                                <th>Maximum Amount : </th>
                                <td>{branch.maximumAmount}</td>
                            </tr>
                            <tr>
                                <th>Max Unsettled Amount :</th>
                                <td>{branch.maximumUnsettledAmount}</td>
                            </tr>
                        </div>
                    </table>
                    <hr />
                    <h3>7.Bank Details</h3>
                    <table className='table-7'>
                        <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>Account Holder Name</th>
                                <th>IFSC Code</th>
                                <th>Bank Name</th>
                                <th>Branch Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {(branch.bankDetails || []).map((bank, index) => (
                                <tr key={index}>
                                    <td>{bank.accountNumber}</td>
                                    <td>{bank.accountHolderName}</td>
                                    <td>{bank.ifscCode}</td>
                                    <td>{bank.bankName}</td>
                                    <td>{bank.branchName}</td>
                                </tr>
                            ))}

                        </tbody>


                    </table>

                    <Link to="/"><button className='btn-discard' style={{ marginTop: "20px" }}>Discard</button>
                    </Link>
                </div>
            </div>



        </section>
    )
}