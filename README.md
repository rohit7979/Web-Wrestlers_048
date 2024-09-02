# Fundmitra


## Introduction
The Fundmitra Platform is a web-based solution designed to assist students at Masai School in Bangalore who face financial challenges in their education. This platform provides a space for students to create fundraising projects and allows donors to contribute to these causes, fostering educational equity and support within the student community.

## Project Type
Fullstack-Web Application

## Deployed App

- Frontend: https://fundmitra.netlify.app/
- Backend: https://backend-render-7zzl.onrender.com

## Directory Structure

```
Web-Wrestlers_048
backend/
│
├── config/
│
├── controllers/
│ 
├── middlewares/
│
├── Models/
│
├── routes/
│
├── server.js
└── package.json

frontend/
│
├── Logo/
│
├── src/
│ ├── Components/
| |
│ ├── Pages/
│ │
│ ├── PrivateRoutes/
│ │
│ ├── Styles/
│ │
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ ├── index.html
│ ├── main.jsx
│ ├── .eslintrc.cjs
│ ├── .gitignore
│ ├── package.json
│ └── README.md
```

## Features

### Features of our website.

- **User Authentication Secure Registration and Login:** mplements encryption with bcrypt and JWT for secure user authentication.
- **Responsive Design Seamless Experience:** Ensures the platform is fully functional and visually appealing across all devices and screen sizes.
- **User Profile Management Profile Creation and Management:** Allows users to create, view, and update their profiles with personal information and project details.
- **CRUD Operations Admin Controls:** Enables administrators to perform Create, Read, Update, and Delete operations on user data and project information.
- **OTP Verification Password Recovery:** Uses One-Time Password (OTP) for secure password resets and verifications.
- **Payment Integration Seamless Donations:** Integrates payment gateways to allow users to donate funds directly from their cards.
- **Self-Fundraising Option Student Fundraising:** Provides students with tools to set up and manage their own fundraising campaigns.


## Technology Stack

### Front-end:
- React for dynamic user interfaces.
- Redux for state management.
- Chakra UI for component styling.
- Axios for handling HTTP requests.

### Back-end:
- Node.js with Express for RESTful API services.
- MongoDB for flexible data storage.
- JWT for secure user authentication.

## API Endpoints

- To get all the projects

- https://backend-render-7zzl.onrender.com/projects

- To get userdata (email, password, name, id) #token req

- https://backend-render-7zzl.onrender.com/user

- To update password #token required

- https://backend-render-7zzl.onrender.com/user/changePassword/

- to update project fields #token required

- https://backend-render-7zzl.onrender.com/project/update

- POST /login - login in a user

- POST /register - create a user account

- POST/logout -logout a user account

- POST/send-otp -to send the otp

- POST/order and POST/verfy - to the payment integration


## Desktop View
![shiksha na ruke](https://github.com/user-attachments/assets/19ac5878-73cb-4a73-96a7-94af1614b136)
![support](https://github.com/user-attachments/assets/1ba8257b-eb04-4a93-b583-beed329f4362)
![footer](https://github.com/user-attachments/assets/d2b59eb8-2c8a-4073-a880-d92a5aad1611)
![profile](https://github.com/user-attachments/assets/909bf00a-60bf-4ebd-bf19-43097072f047)
![contact](https://github.com/user-attachments/assets/a1177cd7-0f4f-4745-9def-1272281c7756)
![fundraiser details](https://github.com/user-attachments/assets/d24f6f79-ed88-445e-a3e6-485c049a694e)
![Screenshot 2024-09-02 124857](https://github.com/user-attachments/assets/3c418191-904d-4c76-a767-56f9f55aa8b4)
![Screenshot 2024-09-02 124449](https://github.com/user-attachments/assets/170ba669-62e6-464a-b9fa-8af76d9ef0a3)
![Screenshot 2024-09-02 124514](https://github.com/user-attachments/assets/5fbf6e9d-b081-4e46-a315-dc371a642ffb)

## Contributors

Thanks to these wonderful people who have contributed to this project:

- Team-Lead [Rohit Verma](https://github.com/rohit7979)
- Collab-1 [Pavan Kalyan](https://github.com/PKalyanReddy)
- Collab-2 [Pradeep Yadav](https://github.com/simply-code-it)

