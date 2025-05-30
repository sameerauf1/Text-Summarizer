Here’s a clean and descriptive `README.md` you can use for your AI text summarizer project that uses Flask and React:

---

# 🧠 AI Text Summarizer (React + Flask)

This is a simple full-stack web application that allows users to input a block of text and select the desired summary length (short, medium, or detailed). The frontend sends this data to a Flask backend, which uses a large language model (LLM) via the OpenAI API to return a summarized version of the input.

This project was mainly built to get my feet wet with Flask and practice full-stack development with React.

---

## 🚀 Getting Started

### Frontend Setup (React)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### 📦 Available Scripts

In the `frontend/` directory, run:

```bash
npm install
npm start
```

* Opens the app in development mode at `http://localhost:3000`.
* Hot-reloads on file save.
* Errors and linter messages shown in the browser console.

---

### Backend Setup (Flask)

Make sure Python 3 and pip are installed.

In the `backend/` directory, create a `.env` file and add your OpenAI key:

```
OPENAI_API_KEY=your_openai_key_here
```

Then install dependencies and start the Flask server:

```bash
pip install -r requirements.txt
python app.py
```

* Flask will run on `http://localhost:5000`
* The React frontend communicates with the `/api/summarize` endpoint

---

## ✨ Features

* React frontend with a simple UI
* Dropdown to select summary length: short, medium, detailed
* Flask backend connected to OpenAI's GPT API
* CORS enabled to allow frontend-backend communication

---

## 🗂 File Structure

```
project-root/
├── backend/
│   ├── app.py         # Flask backend
│   └── .env           # API Key for OpenAI
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── components/TextInput.js
```

---

## 🛠 Technologies Used

* React
* Flask
* OpenAI GPT-3.5-turbo
* Axios
* dotenv
* CORS

---

## 📝 Notes

* This project is for learning purposes and not optimized for production.
* CORS settings are enabled for local development; restrict in production.

