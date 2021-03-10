const path = require('path');
const fs = require('fs');

const editConfigPath = "site/edit/template"
const dataFileName = "data.js"
const codeFileName = "index.jsx"
const lessFileName = "index.less"


//joining path of directory 
const templatePath = 'site/templates/template/element'
const directoryPath = path.join(__dirname, templatePath);

categoryPaths = fs.readdirSync(directoryPath);

let tempData = {}

const CheckAllCategory = async (categoryPaths) => {
    //2. Check config file to create parent config file 
    categoryPaths.forEach(function (categoryName) {
        const categoryPath = path.join(directoryPath, categoryName);
        var statsFile = fs.statSync(categoryPath);
        if (statsFile.isDirectory()) {
            //Load data file     
            const elementPaths = fs.readdirSync(categoryPath);
            if (elementPaths.length > 0) {
                elementPaths.forEach(function (efile) {
                    const dataFile = path.join(categoryPath, efile, dataFileName);
                    const codeFile = path.join(categoryPath, efile, codeFileName);
                    const lessFile = path.join(categoryPath, efile, lessFileName);
                    try {
                        if (fs.existsSync(dataFile) && fs.existsSync(codeFile) && fs.existsSync(lessFile)) {
                            require = require('esm')(module)
                            var data = require(dataFile);

                            templateStr = fs.readFileSync(codeFile, 'utf8');
                            lessStr = fs.readFileSync(lessFile, 'utf8');
                            tempData[efile] = {
                                dataSource: data["default"],
                                templateStr: templateStr.toString(),
                                less: lessStr.toString()
                            }
                        }
                    } catch (err) {
                        console.error("Cannot read data file:  ", dataFile, err)
                    }
                });
            } else {
                console.log("No file in folder: " + categoryPath);
            }
        } else {
            console.log(statsFile + " is file.");
        }
    });
    console.log(`All  tasks complete!`)
};



CheckAllCategory(categoryPaths)


//Write data for files 
// console.log(tempData);

configDataFile = path.join("site/config", "data.json");
fs.writeFile(configDataFile, JSON.stringify(tempData), function (err) {
    if (err) {
        return console.log("Error in writing file", err);
    }
    console.log("Succesfully write data to file: ", configDataFile);
});