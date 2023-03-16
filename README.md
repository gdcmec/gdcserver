# GDC-server
## Usage
To start the server, run npm start. The server will listen on http://localhost:3000 by default.  
You can also set environment variables by creating a .env file in the root of the project directory. The following variables are used:  

PORT: The port on which the server should listen. Defaults to 3000.  
DATABASE_URL: The URL of the database to use. Defaults to mongodb://localhost:27017/GDC.  

## Contributing
Contributions to this project are welcome! To contribute, follow these steps:

1.Fork the repository.   
2.Create a new branch: git checkout -b my-feature-branch.  
3.Make your changes and commit them: git commit -am 'Add some feature'.   
4.Push to the branch: git push origin my-feature-branch.   
5.Create a pull request.   

## Technologies Used
This project uses the following technologies:  

Express: A web application framework for Node.js.  
Mongoose: A MongoDB object modeling tool designed to work in an asynchronous environment.  
