# shareIt

A secure, feature-rich file sharing platform built with Node.js, Express.js, MongoDB, and Multer. This application provides a robust solution for uploading, managing, and sharing files with advanced security and usability features.

## Features

### Security & Control
- *Flexible File Access*
  - Set custom expiration dates for uploaded files
  - Optional password protection for file downloads
  - Restrict file uploads by type and size

### User Experience
- *QR Code Generation*
  - Automatically create scannable QR codes for download links
- *Comprehensive Dashboard*
  - View all uploaded files
  - Track download counts and file metadata
- *Intuitive File Management*
  - Simple upload interface
  - Easy file retrieval with secure access controls

### Technical Specifications
- *File Size Limit*: 10MB
- *Supported File Types*: .jpg, .png, .pdf
- *Download Tracking*: Automatic download count incrementation

##  Prerequisites

### Software Requirements
- *Node.js*: v14 or higher
- *MongoDB*: Local installation or MongoDB Atlas account

### Required npm Packages
- bcrypt: Password hashing
- dotenv: Environment variable management
- ejs: Template rendering
- express: Web application framework
- mongoose: MongoDB object modeling
- multer: File upload handling
- nodemon: Development server with auto-restart

## Installation & Setup

### 1. Clone the Repository
bash
git clone https://github.com/yourusername/file-sharing-platform.git
cd file-sharing-platform


### 2. Install Dependencies
bash
npm install


### 3. Configure Environment
Create a .env file in the project root with the following variables:
env
MONGO=mongodb+srv://<username>:<password>@cluster.mongodb.net/filesharing
PORT=3000


### 4. Start the Server
bash
npm start

### Uploading Files
1. Navigate to the homepage
2. Select a file (.jpg, .png, or .pdf)
3. Optionally:
   - Set a password
   - Specify an expiration date
4. Click "Upload"
5. Receive a unique download link and QR code

### Downloading Files
1. Use the generated download link
2. If password-protected, enter the correct password
3. Download the file

### Dashboard Features
- View all uploaded files
- See file metadata
- Track download statistics

##  Security Considerations
- Password-protected file downloads
- Input validation
- File type and size restrictions
- Secure file storage with MongoDB

## Troubleshooting
- Ensure MongoDB connection is stable
- Check .env file for correct configuration
- Verify Node.js and npm versions
- Review server logs for specific errors
