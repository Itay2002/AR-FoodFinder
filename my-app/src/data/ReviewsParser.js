import * as XLSX from 'xlsx';

const ReviewsParser = async (name, state, city) => {
  try {
    // Load the workbook (adjust the file path as needed)
    const workbook = XLSX.readFile('/path/to/your/restaurant_data.xlsx');
    console.log("Workbook loaded successfully:", workbook);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log("Worksheet data:", worksheet);

    // Convert the worksheet to JSON, mapping columns
    const data = XLSX.utils.sheet_to_json(worksheet, { header: ['Name', 'State', 'City', 'Stars', 'Reviews'], range: 1 });
    console.log("Parsed JSON data:", data);

    // Filter data for the specific restaurant with case insensitive comparison and trimming whitespace
    const restaurant = data.find((item) => 
      item.State.trim().toLowerCase() === state.trim().toLowerCase() &&
      item.City.trim().toLowerCase() === city.trim().toLowerCase() &&
      item.Name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    console.log("Filtered restaurant data:", restaurant); // Log the specific restaurant data if found

    return restaurant ? { stars: restaurant.Stars, reviews: restaurant.Reviews } : null;
  } catch (error) {
    console.error("Error fetching reviews data:", error);
    return null;
  }
};

export default ReviewsParser;
