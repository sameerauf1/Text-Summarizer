from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import openai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/members')
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route('/')
def home():
    return 'Flask server is running!'

@app.route('/api/summarize', methods=['POST', 'OPTIONS'])
@cross_origin()
def summarize_text():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'}), 200
        
    try:
        data = request.get_json()
        text = data.get('text')
        length = data.get('length', 'medium')
        
        # Example response
        return jsonify({"summary": f"Summary of '{text[:30]}...' with length '{length}'."})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)