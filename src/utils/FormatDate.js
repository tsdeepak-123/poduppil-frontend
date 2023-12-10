

export default  function dateFormat(date){
    const orginalDate = new Date(date);
    const year = orginalDate.getFullYear();
    const month = (orginalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = orginalDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate);
    return formattedDate
}