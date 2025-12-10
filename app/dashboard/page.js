import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('../../components/Editor/MonacoEditor'), { ssr: false })

export default function Dashboard(){
  return (
    <main style={{padding: '2rem', fontFamily: 'Arial'}}>
      <h1>Student Dashboard</h1>
      <p>Edit the starter file below and run tests.</p>
      <div style={{height: '500px', border: '1px solid #ddd'}}>
        <MonacoEditor />
      </div>
    </main>
  )
}
