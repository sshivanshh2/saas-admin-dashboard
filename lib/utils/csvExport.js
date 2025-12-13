// Convert array of objects to CSV string
export function convertToCSV(data){
    if (!data || data.length === 0) return ''

    // Get header
    const headers = Object.keys(data[0])

    // Create CSV header row
    const csvHeaders = headers.join(',') //return me a string

    // Create CSV data rows
    const csvRows = data.map((row)=>{
        return headers.map((header)=>{
            const value = row[header]
            
            // Handle values that might contain commas or quotes
             if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"` // Escape quotes
            }
            
            return value //as-is
        }).join(',')
    })
    // Combine headers and rows
    return [csvHeaders, ...csvRows].join('\n')
}

// Download CSV file
export function downloadCSV(csvContent, filename = 'export.csv') {
  // Create blob
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  
  // Create download link
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename) // forces download
  link.style.visibility = 'hidden'
  
  // Trigger download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Combined function - convert and download
export function exportToCSV(data, filename = 'export.csv') {
  const csvContent = convertToCSV(data)
  downloadCSV(csvContent, filename)
}