export default function About() {
  return (
    <div className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8 mt-12">About DEEPVISION LAB</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            DEEPVISION LAB was created with a clear mission: to revolutionize disease detection through artificial
            intelligence. We believe that technology can and should be used to improve healthcare and save lives.
          </p>
          <p className="text-lg">
            Our platform uses advanced deep learning algorithms to analyze medical images and detect early signs of
            various pathologies, enabling faster and more accurate diagnosis.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
          <p className="text-lg mb-4">
            Our AI models have been trained on millions of medical images annotated by experts, covering a wide range of
            medical conditions. We use state-of-the-art convolutional neural network (CNN) architectures, optimized for
            detecting subtle features in medical images.
          </p>
          <p className="text-lg">
            Our system is constantly improved through continuous learning and feedback from healthcare professionals,
            ensuring ever-increasing accuracy and reliability.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-lg">
            DEEPVISION LAB brings together artificial intelligence experts, software engineers, and healthcare
            professionals, all united by the passion to create technological solutions that make a real difference in
            the medical world.
          </p>
        </section>

        <div className="flex justify-center mb-12">
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

