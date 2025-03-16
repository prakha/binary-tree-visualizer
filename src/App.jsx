import { useState } from 'react'
import { TreeCanvas } from './components/TreeCanvas'
import { treeConstructor } from './utils/treeUtils'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [root, setRoot] = useState(null)

  const handleApply = () => {
    if (!input.trim()) return
    const newRoot = treeConstructor(input)
    setRoot(newRoot)
  }

  const handleClear = () => {
    setInput('')
    setRoot(null)
  }

  return (
    <div className="app">
      <div className="inputContainer">
        <textarea
          className="input"
          rows="5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter comma-separated values (e.g. 1,2,3,null,4)"
        />
        <div className="actionBtns">
          <button className="applyBtn" onClick={handleApply}>
            Apply
          </button>
          <button className="clearBtn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
      {root && <TreeCanvas root={root} />}
    </div>
  )
}

export default App
