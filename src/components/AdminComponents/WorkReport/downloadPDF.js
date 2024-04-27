import { axiosAdmin } from "../../../Api/Api";

const downloadPdf = async (apiEndpoint, filename, startDate, endDate, setLoading) => {
    setLoading(true);
    try {
        const response = await axiosAdmin.get(apiEndpoint, {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            },
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error("Error downloading PDF:", error);
        alert('Failed to download PDF');
    } finally {
        setLoading(false);
    }
};

export default downloadPdf;