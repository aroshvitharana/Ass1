#Digital Resume Builder  

A full-stack web application that allows users to create, customize, and save professional resumes online. Built with **React.js**, **Node.js**, **Express**, and **MongoDB**, the app supports features such as authentication, multiple resume templates, real-time preview, and PDF export.  

---

## Features  
- User Authentication (Sign up, Login, Logout)  
- Resume Builder with form-based inputs  
- Template Selection and real-time preview  
- Save and Export resumes as PDF  
- Share via unique URL  
- Responsive, mobile-friendly design  


## Tech Stack  
-Frontend: React.js  
-Backend: Node.js, Express.js  
-Database: MongoDB  
-Version Control: GitHub  
-Project Management: JIRA  
-DevOps: CI/CD pipelines (GitHub Actions)  
System Modeling: SysML diagrams  


digital-resume-builder/
│
├── backend/        # Node.js + Express API
│   ├── models/     # Mongoose schemas
│   ├── routes/     # API routes
│   ├── controllers/# Route logic
│   └── server.js   # App entry point
│
├── frontend/       # React.js app
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   └── App.js       # Main app
│
├── .github/workflows/   # CI/CD pipeline configs
├── README.md
└── package.json


## Installation & Setup  
### Steps  
1. Clone the repository  
   ```bash
   git clone https://github.com/rajuiit/taskmanagerv0.3.git # (After clone Progress with "Digital Resume Builder")


##Install dependencies for both frontend & backend
cd backend
npm install
cd ../frontend
npm install

##Create a .env file in the backend folder with:
MONGO_URI=mongodb+srv://user:pass@cluster0.kr2z82b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
PORT=5001

##Run the backend server
cd backend
npm start

##Run the frontend app
cd frontend
npm install  
npm start 

##Run  
npm run dev  


*Deploying to Ubuntu Server*
------------------------------
1. EC2 Instance using Putty (Windows)
Download and Deploy Putty
Enter "Host Name (Or IP Address)
click SSH ->Auth -> Credentials -> Browse 
Select .ppk file 
Type "ubuntu" and press enter


2. Setup nginx:   
mkdir www  
cd www  
sudo apt-get install nginx  
sudo service nginx restart all  

3. Setup pm2:  
sudo apt-get update  
sudo apt install curl  
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash  
source ~/.bashrc  
nvm --version  
nvm install 22  
npm install -g pm2  

4. Setup Github actions:  
Settings->enivronment->new environment->add environment secret->  
(Add environment variables from .env file)  
Secrets and variables->Actions->New repository secret->  
(Add new secret PROD with all environment variables)  

5.Push to git on main branch:  
git add .  
git commit  
git push 

6. Create and start runner:  
create a new self-hosted runner (Linux x64) and run all the commands in Download and configure (expect run)  
sudo ./svc.sh install  
sudo ./svc.sh start  

7. Run pm2  

(in backend dir)  
npm install -g yarn  
yarn install  
nano .env (copy & paste .env file)  
cntrl+x y  
pm2 start “npm run start” --name=“backend”  

(in frontend dir)  
yarn install  
sudo rm -rf ./build  
yarn run build  
pm2 serve build/ 3000 --name "Frontend" --spa  

pm2 status  
pm2 save  

8. nginx configuration:  
sudo rm -r /etc/nginx/sites-available/default  
sudo nano /etc/nginx/sites-available/default ->  
   server {  
      server_name _;  
      location / {  
      proxy_pass http://localhost:3000;  
      proxy_set_header Host $host;  
      proxy_set_header X-Real-IP $remote_addr;  
      proxy_set_header X-Forwarded-for  
      $proxy_add_x_forwarded_for;  
   }  
sudo service nginx restart all  
pm2 restart all  
change base url in axiosConfig.js to public url of instance  

9. Access your application -> http://<Public ID>  


*Jira Dashbaord Link*: https://aroshvitharana1234.atlassian.net/jira/software/projects/DRB/boards/34?atlOrigin=eyJpIjoiMzhlMTZkNWQyNzVmNDRjY2FmMWFkNTI0YTI3NDRlMTMiLCJwIjoiaiJ9
*Public URL*: http://13.210.33.67/ 
