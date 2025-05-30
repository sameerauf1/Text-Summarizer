import React, { useState } from 'react';
import axios from 'axios';

const TextSummarizer = () => {
  const [text, setText] = useState('');
  const [length, setLength] = useState('medium');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    console.log('[handleSummarize] Called with:', { text, length });
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/summarize',
        { text, length },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('[handleSummarize] Response:', response.data);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('[handleSummarize] Error:', error);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h2>AI Text Summarizer</h2>
      <textarea
        rows={6}
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ width: '100%' }}
      />
      <div style={{ marginTop: 10 }}>
        <label>Summary Length: </label>
        <select
          value={length}
          onChange={e => setLength(e.target.value)}
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="detailed">Detailed</option>
        </select>
      </div>
      <button onClick={handleSummarize} style={{ marginTop: 10 }}>
        Summarize
      </button>
      {summary && (
        <div style={{ marginTop: 20 }}>
          <h4>Summary:</h4>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TextSummarizer;
