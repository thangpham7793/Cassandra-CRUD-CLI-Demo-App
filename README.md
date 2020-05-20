# cli-demo-studio-project-1
A simple CLI for performing basic CRUD operations on a MongoDB instance using NodeJS, inquirer.js, and commander.js


### To get started, clone or download the project. Then simply open Git bash at the file location and type:

npm install 

This will install all dependencies.

### Once installation's complete, simply type:

cli-demo-app -h OR cli-demo-app --help

This will show a list of all available commands

### For example, to add a student by answering questions, type:

cli-demo-app a OR cli-demo-app add

and then answer all questions.

### To find all students, type:

cli-demo-app fa OR cli-demo-app find-all

### To find a student by name, type:

cli-demo-app fbn OR cli-demo-app find-by-name

then enter the student name and you're sweet!

### READ operations will automatically be saved as a csv file to a folder called query-result inside your current working directory. No file will be created if results are empty.
