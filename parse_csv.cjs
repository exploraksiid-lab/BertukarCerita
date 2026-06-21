const fs = require('fs');

const csvContent = fs.readFileSync('d:/Bertukar Cerita/Latihan Ngobrol/latihan_ngobrol_ford_templates.csv', 'utf-8');
const lines = csvContent.split('\n').filter(line => line.trim() !== '');

const results = [];
let idCounter = 1;

// Regex to handle CSV with quotes: /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\s\S][^'\\]*)*)'|"([^"\\]*(?:\\[\s\S][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g
function parseCSVLine(text) {
    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\s\S][^'\\]*)*)'|"([^"\\]*(?:\\[\s\S][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    var a = [];                     // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
        function(m0, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
        });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    return a;
}

// headers: Category,Question,Acknowledge_Template,Relate_Template,Ask_Template
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const parts = parseCSVLine(line);
  if (parts.length >= 5) {
    results.push({
      id: `Q_${String(idCounter).padStart(3, '0')}`,
      category: parts[0] || "",
      question: parts[1] || "",
      acknowledge: parts[2] || "",
      relate: parts[3] || "",
      ask: parts[4] || ""
    });
    idCounter++;
  }
}

if (!fs.existsSync('d:/Bertukar Cerita/src/data')) {
  fs.mkdirSync('d:/Bertukar Cerita/src/data', { recursive: true });
}

fs.writeFileSync('d:/Bertukar Cerita/src/data/latihan_ngobrol.json', JSON.stringify(results, null, 2));
console.log('Successfully wrote to d:/Bertukar Cerita/src/data/latihan_ngobrol.json');
