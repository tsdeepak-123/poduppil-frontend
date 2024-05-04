import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import downloadPdf from './downloadPDF';
import ReturnButton from '../../CommonComponents/Return/ReturnButton';


function Report() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [selectedReport, setSelectedReport] = useState('');
    

    const handleDownloadPdf = (reportType) => {
        setLoading(true);
        downloadPdf(reportType, `${reportType}-report.pdf`, startDate, endDate, () => setLoading(false));
    };

    return (
        <>
        <ReturnButton navigation={"/admin/officedetails"}/>
        <h1 className="flex justify-center text-3xl font-bold">Download Report</h1>
        <div className="flex flex-row items-center justify-center gap-8 mb-24">
            <div className="mb-4">
                <select value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)} className="p-2 border border-gray-300 rounded">
                    <option value="">Select Report Type</option>
                    <option value="totalreport">Total Report</option>
                    <option value="workreport">Purchases Report</option>
                    <option value="attendancereport">Labour Attendance Report</option>
                    <option value="staffattendancereport">Staff Attendance Report</option>
                    <option value="recievedcashreport">Recieved Cash Report</option>
                    <option value="billsreport">Bills Report</option>
                </select>
            </div>
            <div className="mb-4 flex items-center">
                <label className="mr-2">Start Date:</label>
                <DatePicker className="p-2 border border-gray-300 rounded" selected={startDate} onChange={date => setStartDate(date)} />
            </div>
            <div className="mb-4 flex items-center">
                <label className="mr-2">End Date:</label>
                <DatePicker className="p-2 border border-gray-300 rounded" selected={endDate} onChange={date => setEndDate(date)} />
            </div>
            <button 
                className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" 
                onClick={() => handleDownloadPdf(selectedReport)} 
                disabled={loading || !selectedReport}
            >
                {loading ? 'Loading...' : 'Download Report'}
            </button>
        </div>
        </>
    );
}

export default Report;
