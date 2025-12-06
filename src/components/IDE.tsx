"use client";
import { useEffect, useState, useRef } from 'react';

export default function IDE() {
  const [code, setCode] = useState('');
  const scrollRef = useRef<HTMLPreElement>(null);

  // The final code we want to display (Refactored version)
  const finalCode = `def calculator(a, b, op):
    """
    Advanced Calculator
    Handles basic arithmetic
    """
    # Check for addition
    if op == '+': 
        return a + b
    
    # Check for subtraction
    elif op == '-': 
        return a - b
    
    # Check for multiplication
    elif op == '*': 
        return a * b
        
    # Handle division safely
    elif op == '/':
        if b == 0:
            return "Error: Div/0"
        return a / b

# Execute Calculation
res = calculator(10, 5, '+')
print(f"Result: {res}")`;

  useEffect(() => {
    let i = 0;
    let timeoutId: NodeJS.Timeout;
    
    const typeCharacter = () => {
      // 1. Reset Loop
      if (i >= finalCode.length) {
        timeoutId = setTimeout(() => {
          setCode('');
          i = 0;
          typeCharacter();
        }, 3000); // Wait 3 seconds at the end before looping
        return;
      }

      // 2. Typing Logic
      setCode(finalCode.slice(0, i + 1));
      i++;

      // 3. Auto Scroll
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }

      // 4. Randomized Typing Speed (Slower feel)
      // Random between 50ms and 150ms for realism
      const randomSpeed = Math.floor(Math.random() * 100) + 50; 
      timeoutId = setTimeout(typeCharacter, randomSpeed);
    };

    typeCharacter();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="floating glass" style={{
      width: '100%', maxWidth: '550px', height: '400px',
      borderRadius: '12px', overflow: 'hidden', position: 'relative',
      boxShadow: 'var(--glow)', background: 'var(--code-bg)',
      border: '1px solid rgba(129, 140, 248, 0.3)',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* Mac-style Header */}
      <div style={{ 
        background: 'rgba(0,0,0,0.3)', padding: '12px', flexShrink: 0,
        display: 'flex', gap: '8px', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' 
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
        <span style={{ marginLeft: '15px', fontSize: '0.8rem', opacity: 0.6, fontFamily: 'monospace' }}>
          calculator_v2.py
        </span>
      </div>

      {/* Code Area with Scrolling */}
      <pre ref={scrollRef} style={{
        padding: '20px', color: '#a5b4fc', fontSize: '0.95rem',
        fontFamily: 'Consolas, "Courier New", monospace', whiteSpace: 'pre-wrap',
        lineHeight: '1.6', overflowY: 'auto', height: '100%',
        scrollbarWidth: 'none' /* Hide scrollbar for clean look */
      }}>
        {code}
        <span style={{ borderRight: '2px solid var(--primary-color)', animation: 'blink 1s infinite' }}></span>
      </pre>
    </div>
  );
}