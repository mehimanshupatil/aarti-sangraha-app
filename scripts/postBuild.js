const {glob} = require('glob');
const fs = require('fs');
const path = require('path');
 

// Use glob to find all HTML files in the directory
const fun  = async ()=> {
  const files = await  glob(`./dist/**/*.html`)
   
  // Loop through the found files
  files.forEach((filePath) => {
    fs.readFile(filePath, 'utf8', (readErr, data) => {
      if (readErr) {
        console.error(`Error reading file ${filePath}:`, readErr);
        return;
      }

      // Perform the replacement
      const replacedData = data.replace(/%5C/g, '%255C');

      // Write the updated content back to the file
      fs.writeFile(filePath, replacedData, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error(`Error writing file ${filePath}:`, writeErr);
          return;
        }

        console.log(`Replaced "%5C" with "%255C" in ${filePath}`);
      });
    });
  });
 
}

fun()