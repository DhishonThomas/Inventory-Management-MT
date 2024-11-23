import { toast } from "react-toastify";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";


export const exportDataToExcel = (data:any, fileName = "data.xlsx") => {
    if (!data || data.length === 0) {
      console.error("No data available for export.");
      return;
    }
  
    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
    // Write the workbook to a file
    XLSX.writeFile(workbook, fileName);
  };
  


export const exportTableToPDF = (tableId:any, title = "Report") => {
  const tableElement = document.getElementById(tableId);

  if (!tableElement) {
    console.error(`Table with ID "${tableId}" not found.`);
    return;
  }

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set title
  doc.setFontSize(16);
  doc.text(title, 10, 10);

  // Add table content to PDF
  let y = 20; // Start position for table rows
  const tableRows = tableElement.querySelectorAll("tr");

  tableRows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll("th, td");
    let x = 10;

    cells.forEach((cell:any) => {
      const text = cell.innerText || cell.textContent;
      doc.setFontSize(rowIndex === 0 ? 12 : 10); // Larger font size for headers
      doc.text(text, x, y);
      x += 50; // Move x for next column
    });

    y += 10; // Move y for the next row
    if (y > 280) {
      // Add a new page if content exceeds the page height
      doc.addPage();
      y = 10;
    }
  });

  // Save the PDF
  doc.save(`${title}.pdf`);
};


export const printTable = (tableId:any, title = "Report") => {
  const tableContent = document.getElementById(tableId)?.outerHTML || "";
  if (!tableContent) {
    toast.error("Unable to find the table for printing", {
      position: "top-center",
      autoClose: 5000,
      theme: "dark",
    });
    return;
  }

  // Open a new window for printing
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>${title}</h2>
          ${tableContent}
        </body>
      </html>
    `);
    printWindow.document.close(); 
    printWindow.print();
  } else {
    toast.error("Failed to open the print window", {
      position: "top-center",
      autoClose: 5000,
      theme: "dark",
    });
  }
};
