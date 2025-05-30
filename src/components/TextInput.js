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
    <div style={{
      padding: '40px',
      maxWidth: '800px',
      margin: '40px auto',
      backgroundColor: '#f8f5f0',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      fontFamily: "'Helvetica Neue', sans-serif"
    }}>
      <h2 style={{
        color: '#333',
        fontWeight: 300,
        fontSize: '28px',
        marginBottom: '30px',
        textAlign: 'center',
        letterSpacing: '1px'
      }}>AI Text Summarizer</h2>
      
      <textarea
        rows={8}
        value={text}
        onChange={e => setText(e.target.value)}
        style={{
          width: '100%',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '16px',
          minHeight: '200px',
          marginBottom: '20px',
          backgroundColor: '#fff',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)'
        }}
        placeholder="Enter your text to generate a premium summary..."
      />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <label style={{
          marginRight: '15px',
          fontSize: '16px',
          color: '#555'
        }}>Summary Length: </label>
        <select
          value={length}
          onChange={e => setLength(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            fontSize: '16px',
            color: '#333',
            minWidth: '120px'
          }}
        >
          <option value="short">Concise</option>
          <option value="medium">Balanced</option>
          <option value="detailed">Comprehensive</option>
        </select>
      </div>
      
      <button 
        onClick={handleSummarize} 
        style={{
          padding: '12px 30px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          width: '100%',
          letterSpacing: '1px',
          ':hover': {
            backgroundColor: '#333'
          }
        }}
      >
        Generate Premium Summary
      </button>
      
      {summary && (
        <div style={{
          marginTop: '40px',
          padding: '25px',
          backgroundColor: '#fff',
          borderRadius: '6px',
          borderLeft: '4px solid #000'
        }}>
          <h4 style={{
            color: '#000',
            fontWeight: 400,
            fontSize: '18px',
            marginBottom: '15px'
          }}>Executive Summary</h4>
          <p style={{
            color: '#333',
            lineHeight: '1.6',
            fontSize: '16px'
          }}>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TextSummarizer;
