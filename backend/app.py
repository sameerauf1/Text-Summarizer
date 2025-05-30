from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
from openai import OpenAI  # Add this import
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        length_prompts = {
            'short': 'Summarize in 1-2 sentences (max 50 words). Focus only on core concepts: ',
            'medium': 'Summarize in 3-5 sentences (max 150 words). Include key supporting points: ',
            'detailed': 'Summarize comprehensively (max 300 words). Maintain all important details: '
        }

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Provide the summary in clean paragraph format without introductory phrases like 'Here is a summary'."},
                {"role": "user", "content": f"{length_prompts[length]}{text}"}
            ],
            temperature=0.5,
            max_tokens=500  # Prevents overly long responses
        )

        summary = response.choices[0].message.content
        return jsonify({"summary": summary})

    except openai.BadRequestError as e:
        return jsonify({'error': 'Invalid request to OpenAI API'}), 400
    except openai.AuthenticationError as e:
        return jsonify({'error': 'OpenAI authentication failed'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)