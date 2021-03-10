const path = require('path');
const fs = require('fs');


const configFileName = "template.config.js"

const Handlebars = require('handlebars');

const source = `{{#each categories}}
import {{this}} from './{{this}}/template.config';
{{/each}}

export default {
    {{#each categories}}
    ...{{this}},
    {{/each}}
  };
`;

const elementSource = `{{#each elements}}
import {{this}} from './{{this}}/template.config';
{{/each}}

export default {
    {{#each elements}}
    {{this}},
    {{/each}}
  };
`;

const template = Handlebars.compile(source);
const elementTemplate = Handlebars.compile(elementSource);

//joining path of directory 
const templatePath = 'site/templates/template/element'
const directoryPath = path.join(__dirname, templatePath);

categoryPaths = fs.readdirSync(directoryPath);

//1. Check submodule and create config each category 
const CheckSubCategory = async (categoryName) => {
    console.log("categoryName = ", categoryName)
    const categoryPath = path.join(directoryPath, categoryName);
    var statsFile = fs.statSync(categoryPath);
    if (statsFile.isDirectory()) {
        const elementPaths = fs.readdirSync(categoryPath);
        let elements = [];
        elementPaths.forEach(function (efile) {
            const elementConfigFile = path.join(categoryPath, efile, configFileName);
            try {
                if (fs.existsSync(elementConfigFile)) {
                    elements.push(efile);
                }
            } catch (err) {
                console.error("Cannot file config file in folder", elementConfigFile, err)
            }
        });
        if (elements.length > 0) {
            let output = elementTemplate({ elements: elements });
            console.log("Start create config file for categoy:  " + categoryName)
            // console.log(output)
            const configFile = path.join(categoryPath, configFileName);
            fs.writeFile(configFile, output, function (err, data) {
                if (err) {
                    return console.log("Error in writing file", err);
                }
                console.log("Succesfully write data to element file: ", configFile, data);
            });
        }
    }
}
const CheckAllCategory = async (categoryPaths) => {
    const promises = categoryPaths.map(CheckSubCategory);
    await Promise.all(promises)
    console.log(`All async tasks complete!`)


    //2. Check config file to create parent config file 
    let categories = [];
    categoryPaths.forEach(function (categoryName) {
        const categoryConfigPath = path.join(directoryPath, categoryName, configFileName);
        try {
            if (fs.existsSync(categoryConfigPath)) {
                categories.push(categoryName);
            }
        } catch (err) {
            console.error("Cannot file config file in folder: ", categoryConfigPath, err)
        }
    });

    if (categories.length > 0) {
        let output = template({ categories: categories });
        console.log("Start create config file:  " + configFileName)
        // console.log(output)
        const configFile = path.join(directoryPath, configFileName);
        fs.writeFile(configFile, output, function (err, data) {
            if (err) {
                return console.log("Error in writing file", err);
            }
            console.log("Succesfully write data to file: ", configFile, data);
        });
    }

    console.log(`All  tasks complete!`)

};

//Start create config file 
CheckAllCategory(categoryPaths);