export default async (req, res) => {
    const response = await fetch('http://coldnova.xyz'); // Replace with your target URL
    const data = await response.json();  // Adjust based on the response format
  
    res.status(200).json(data);
  };