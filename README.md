
---

# AI-CodeMind

AI-CodeMind is a **real-time AI chatbot application** built using **Node.js, Express, Socket.IO, and Google Generative AI**.
The application enables users to interact with an AI model in real time, providing intelligent, context-aware responses through a web-based chat interface.

---

## Overview

The goal of AI-CodeMind is to demonstrate the integration of **Generative AI** with **real-time communication**.
It follows a modular backend architecture and a simple frontend interface, making it easy to extend and scale for future AI-driven features.

---

## Key Features

* Real-time AI chatbot using Socket.IO
* AI responses powered by Google Gemini (`gemini-3-flash-preview`)
* Scalable backend architecture with Express.js
* Modular AI service layer
* Frontend real-time chat interface
* Environment-based configuration using dotenv
* API testing support with Postman

---
## Deployment : coming soon


## AI Model Details

* Provider: Google Generative AI
* Model: `gemini-3-flash-preview`
* Purpose: Generates contextual and formatted chatbot responses

---

## Technology Stack

### Backend

* Node.js
* Express.js
* Socket.IO
* Google Generative AI SDK

### Frontend

* HTML
* CSS
* JavaScript
* Socket.IO Client

### Tools

* Postman
* Git & GitHub

---



## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/thakare18/AI-CodeMind.git
cd AI-CodeMind
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
GOOGLE_API_KEY=your_google_genai_api_key
```

### Run the Application

```bash
npm start
```

The server will be available at:

```
http://localhost:5000
```

---

## Application Flow

1. User sends a message through the chat interface
2. Message is transmitted to the backend using Socket.IO
3. Backend processes the message using the Gemini AI model
4. AI-generated response is returned to the user in real time

---

## Current Status

* Core chatbot functionality implemented
* Real-time messaging operational
* Frontend UI under active enhancement 
* Deployment planned(coming soon)

---

## Future Enhancements

* Persistent chat history
* User authentication and authorization
* Improved UI/UX
* Multi-model AI support
* Cloud deployment and scalability improvements

---

## Contribution Guidelines

Contributions are welcome.
Please open an issue or submit a pull request for improvements or bug fixes.


## Contact 
Name: Prathamesh Thakare.
mail: prathameshthakare9677@gmail.com
GitHub: https://github.com/thakare18
