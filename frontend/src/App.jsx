import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import axios from "axios"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`function sum(){
    return 1+1
    }`)
   const [review , setReview] = useState('')



  useEffect(() => {
    prism.highlightAll()
  },[code])

 async function reviewCode(){
 const response=await axios.post("http://localhost:3000/ai/get-review", { code })
setReview(response.data)
 }
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              spellCheck={false}
              style={{
                fontFamily: '"Fira code",monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "10px",
                height: "100%",
                width: "100%",
                 color: "#f8f8f2" 
              }}
            />

          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right"><Markdown  rehypePlugins={[rehypeHighlight]}>
         
          
          {review}</Markdown></div>


      </main>
    </>
  )
}

export default App
