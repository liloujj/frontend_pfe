export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to DEEPVISION LAB</h1>
      <p className="text-xl max-w-2xl text-center mb-8">
        Our platform uses cutting-edge artificial intelligence to detect diseases from medical images.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-3">Image Analysis</h2>
          <p>Upload your medical images for instant analysis by our AI.</p>
        </div>
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-3">Accurate Results</h2>
          <p>Get detailed results with an accuracy rate of over 95%.</p>
        </div>
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-3">Medical Tracking</h2>
          <p>Track the evolution of your analyses over time with our dashboard.</p>
        </div>
      </div>
    </div>
  )
}

