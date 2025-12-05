# 🚀 API Tester

A modern, feature-rich API testing application built with Angular. Test your backend APIs, detect CORS errors, and identify HTTP status codes with a beautiful, premium dark-themed interface.

![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-GNU-green?style=flat-square)

## ✨ Features

### 🎯 Core Functionality

- **Multiple HTTP Methods**: Support for GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
- **Custom Headers**: Dynamic key-value pairs with enable/disable toggles
- **Dual Body Types**:
  - **JSON**: Syntax-highlighted textarea for raw JSON input
  - **Form-Data**: Support for both text and file uploads
- **File Upload**: Each form-data field can be either text or file with easy toggle

### 🚨 Advanced Error Detection

- **CORS Error Detection**: Specifically identifies CORS-related failures with detailed explanations
- **HTTP Status Categorization**:
  - ✅ 2xx (Success) - Green badge
  - ⚠️ 3xx (Redirect) - Yellow badge
  - 🔶 4xx (Client Error) - Orange badge
  - ❌ 5xx (Server Error) - Red badge
- **Network & Timeout Errors**: Comprehensive error handling

### 📊 Response Display

- **Color-Coded Status Badges**: Instantly identify response status
- **Request Timing**: Millisecond-accurate performance measurement
- **Complete Headers**: Full response header display
- **Formatted JSON**: Auto-formatted response body
- **Error Alerts**: Prominent, context-specific error messages

### 📜 Request History

- **Last 10 Requests**: Automatic history tracking
- **One-Click Reload**: Quickly restore and re-send previous requests
- **Responsive Toggle**: History panel auto-hides on tablet/mobile for space efficiency
- **Persistent Storage**: History maintained during session

### 🎨 Premium UI/UX

- **Dark Theme**: Modern glassmorphism design
- **Gradient Accents**: Purple-to-blue gradients throughout
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Responsive Layout**: Adapts to desktop, tablet, and mobile screens
- **Custom Components**: Professionally styled dropdowns, buttons, and inputs

## 🛠️ Tech Stack

- **Framework**: Angular 21
- **Language**: TypeScript 5.5
- **Styling**: CSS3 with CSS Variables
- **HTTP Client**: Angular HttpClient with RxJS
- **State Management**: Angular Signals
- **Font**: Google Fonts (Inter)

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.x or higher (comes with Node.js)
- **Angular CLI**: Version 18.x or higher

Check your versions:

```bash
node --version
npm --version
ng version
```

## 🚀 Installation

1. **Clone or download the project** to your local machine

2. **Navigate to the project directory**

   ```bash
   cd api-test-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## ▶️ Running the Application

### Development Server

Start the development server:

```bash
ng serve
```

Or to automatically open in your default browser:

```bash
ng serve --open
```

The application will be available at: **http://localhost:4200**

### Build for Production

Create an optimized production build:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 📖 Usage Guide

### 1. Basic API Request

1. **Enter the API URL** in the URL input field
2. **Select HTTP method** from the dropdown (GET, POST, etc.)
3. Click **Send** button
4. View the response with status code, headers, and body

**Example:**

```
URL: https://jsonplaceholder.typicode.com/posts/1
Method: GET
```

### 2. Adding Custom Headers

1. Click **+ Add Header** button
2. Enter header name (e.g., `Authorization`)
3. Enter header value (e.g., `Bearer token123`)
4. Use the checkbox to enable/disable headers
5. Click × to remove unwanted headers

### 3. Sending JSON Data

1. Select **JSON** from the body type buttons
2. Enter your JSON in the textarea:
   ```json
   {
     "title": "Test Post",
     "body": "This is a test",
     "userId": 1
   }
   ```
3. Click **Send**

### 4. Sending Form-Data

1. Select **FORM DATA** from the body type buttons
2. Click **+ Add Form Data Field** to add fields
3. For each field:
   - Enter the **key** name
   - Click the purple **toggle icon** to switch between text/file
   - For **text**: Enter the value directly
   - For **file**: Click "Choose File" and select a file
4. Click **Send**

### 5. Using Request History

- **Desktop**: History panel is always visible on the right
- **Tablet/Mobile**: Click the floating purple button on the right edge to show/hide history
- Click any history item to reload that request
- Click **Clear** to remove all history

## 🔍 Error Detection Examples

### CORS Error

When testing APIs that don't have proper CORS headers, you'll see:

- Status: `0` or error status
- Red alert box with "🚫 CORS Error Detected"
- Detailed explanation with troubleshooting tips

### HTTP Errors

- **404 Not Found**: Orange badge with client error alert
- **500 Internal Server Error**: Red badge with server error alert
- **401 Unauthorized**: Orange badge indicating authentication required

## 📁 Project Structure

```
api-test-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── api-tester/          # Main API testing component
│   │   ├── models/
│   │   │   └── api-request.model.ts # TypeScript interfaces
│   │   ├── services/
│   │   │   └── api.service.ts       # HTTP request service
│   │   ├── app.ts                   # Root component
│   │   ├── app.config.ts            # App configuration
│   │   └── app.routes.ts            # Routing configuration
│   ├── styles.css                   # Global styles
│   └── index.html                   # Main HTML file
├── public/                          # Static assets
├── angular.json                     # Angular CLI configuration
├── package.json                     # Dependencies
└── tsconfig.json                    # TypeScript configuration
```

## 🎯 Key Files

- **`api-tester.component.ts`**: Main component with request handling logic
- **`api-tester.component.html`**: UI template with form and response display
- **`api-tester.component.css`**: Premium styling with dark theme
- **`api.service.ts`**: Service for making HTTP requests and error detection
- **`api-request.model.ts`**: TypeScript models for requests and responses

## 🔮 Future Enhancements (Roadmap)

- [ ] **Collections**: Save and organize requests into collections using localStorage
- [ ] **Environment Variables**: Manage different API environments (dev, staging, prod)
- [ ] **Import/Export**: Export collections as JSON files for backup/sharing
- [ ] **Authentication Helpers**: Quick setup for Bearer tokens, API keys, etc.
- [ ] **Request Templates**: Pre-configured request templates
- [ ] **Response Validation**: JSON schema validation
- [ ] **Code Generation**: Generate API client code from requests

## 🐛 Known Limitations

- **CORS Restrictions**: Some APIs may block requests from the browser due to CORS policies. This is a browser security feature, not a limitation of this tool.
- **Browser File Upload**: File uploads are limited by browser capabilities
- **History Persistence**: Current history is session-based (future: localStorage)

## 💡 Tips & Tricks

1. **Quick Method Change**: Use keyboard to quickly select HTTP method in dropdown
2. **Enable/Disable Headers**: Use checkboxes to temporarily disable headers without removing them
3. **File Upload Toggle**: Click the purple document icon to switch between text and file modes
4. **History Access**: On mobile, use the floating button to access history without scrolling
5. **Keyboard Shortcuts**: Tab through form fields for faster input

## 📝 Development

### Adding New Features

1. **Components**: Add new components in `src/app/components/`
2. **Services**: Add services in `src/app/services/`
3. **Models**: Define interfaces in `src/app/models/`

### Running Tests

```bash
ng test
```

### Code Formatting

The project uses Angular's default formatting. To maintain consistency:

- Use TypeScript strict mode
- Follow Angular style guide
- Use meaningful variable names

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - free to use, modify, and distribute.

## 👨‍💻 Author

Built with ❤️ using Angular

---

**Need Help?** Open an issue or check the [Angular Documentation](https://angular.dev)

**Powered by**: Angular 21 | TypeScript | RxJS | Modern Web Standards
