'use client'
import { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'

export default function MonacoEditor(){
  const ref = useRef(null)
  useEffect(()=>{
    if(!ref.current) return
    const editor = monaco.editor.create(ref.current, {
      value: '// Edit the starter file: runner/student-templates/madlib.js\nfunction makeStory(inputs = {}) {\n  const name = inputs.name || "Friend"\n  const color = inputs.color || "colorful"\n  const animal = inputs.animal || "creature"\n  return `Once upon a time, ${name} found a ${color} ${animal} in the garden.`\n}\n\nmodule.exports = { makeStory }',
      language: 'javascript',
      automaticLayout: true,
    })
    return ()=> editor.dispose()
  }, [])
  return <div ref={ref} style={{height: '100%', width:'100%'}} />
}
