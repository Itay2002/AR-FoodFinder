import * as XLSX from 'xlsx';

const FoodParser = async () => {
  try {
    const response = await fetch('../AR-FoodFinder/FoodAR.xlsx'); // Adjust this path if needed
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Create an array of objects based on the parsed data
    const foodData = jsonData.slice(1).map(row => ({
      name: row[0] || '',
      state: (row[1] || '').toUpperCase(), // Ensure state is uppercase
      city: row[2] || '',
    }));

    return foodData; // Return all the food data
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    throw error; // Rethrow the error for handling if needed
  }
};

export default FoodParser;
