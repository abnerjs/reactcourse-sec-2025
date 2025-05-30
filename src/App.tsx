import AttendeeList from './components/attendee-list'
import Header from './components/header'

function App() {
  return (
    <div className="max-w-[1216px] mx-auto py-5 flex h-screen flex-col gap-5">
      <Header />
      <AttendeeList />
    </div>
  )
}

export default App
