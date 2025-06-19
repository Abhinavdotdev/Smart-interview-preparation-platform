const Home = () => {
  return (
  // header-code

    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center text-white overflow-hidden px-6">
      
      {/* Floating dots background */}
      <div className="absolute w-56 h-56 bg-purple-700 rounded-full mix-blend-lighten opacity-20 blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-48 h-48 bg-pink-600 rounded-full mix-blend-lighten opacity-20 blur-2xl bottom-20 right-20 animate-pulse delay-2000" />
      
      {/* Logo and top brand name */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="bg-pink-600 p-2 rounded-lg">
          <span role="img" aria-label="trophy" className="text-white text-xl">🏆</span>
        </div>
        {/* <h1 className="text-xl font-bold">Mockify</h1> */}
      </div>

      {/* Trusted badge */}
      <div className="mb-4 bg-white/10 text-sm text-white px-4 py-1 rounded-full border border-white/20 shadow-md">
        ⭐ Trusted by Many professionals
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center leading-tight">
        Smart Interview <br />
        <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Preparation Platform
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl text-center">
        Master your next interview with AI-powered practice sessions, real-time feedback,
        and personalized coaching tailored to your career goals AND check you Resume strength.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition">
          Start Free Practice →
        </button>
        <button className="bg-white/10 border border-white/20 px-6 py-3 rounded-full text-white font-semibold hover:bg-white/20 transition">
          ▶ Watch Demo
        </button>
      </div>

      {/* Stats Section */}
<section className="w-full px-6 py-16 bg-gradient-to-b from-transparent to-purple-900 flex flex-col items-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
    
    {/* Stat Card */}
    <div className="bg-white/10 rounded-xl p-6 text-center border border-white/20 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-white">50K+</h2>
      <p className="mt-2 text-sm text-gray-200">Successful Interviews</p>
    </div>

    <div className="bg-white/10 rounded-xl p-6 text-center border border-white/20 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-white">95%</h2>
      <p className="mt-2 text-sm text-gray-200">Success Rate</p>
    </div>

    <div className="bg-white/10 rounded-xl p-6 text-center border border-white/20 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-white">500+</h2>
      <p className="mt-2 text-sm text-gray-200">Trending Questions</p>
    </div>

    <div className="bg-white/10 rounded-xl p-6 text-center border border-white/20 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-white">4.9/5</h2>
      <p className="mt-2 text-sm text-gray-200">User Rating</p>
    </div>
  </div>

  {/* Section Heading */}
  <h2 className="mt-16 text-3xl md:text-4xl font-extrabold text-white text-center">
    Why Choose Mockify?
  </h2>
</section>

{/* Feature Cards Section */}
<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full px-4">

  {/* Feature: Mock Interviews */}
  <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md">
    <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-white rounded-xl text-2xl">
      ⚡
    </div>
    <div className="from-green-500 to-emerald-500">
      <h3 className="text-white text-xl font-semibold ">Mock Interviews</h3>
      <p className="text-gray-300 mt-1 text-sm">
        Practice with simulated interview environments for various companies
      </p>
    </div>
  </div>

  {/* Feature: AI-Powered Practice */}
  <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md">
    <div className="w-14 h-14 flex items-center justify-center bg-pink-500 text-white rounded-xl text-2xl">
      🎯
    </div>
    <div className="from-purple-500 to-pink-500">
      <h3 className="text-white text-xl font-semibold ">AI-Powered Practice</h3>
      <p className="text-gray-300 mt-1 text-sm">
        Get personalized interview questions based on your field and experience level
      </p>
    </div>
  </div>

  {/* Feature: Real-time Feedback */}
  <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md">
    <div className="w-14 h-14 flex items-center justify-center bg-sky-500 text-white rounded-xl text-2xl">
      🏅
    </div>
    <div className="from-blue-500 to-cyan-500">
      <h3 className="text-white text-xl font-semibold ">Real-time Feedback</h3>
      <p className="text-gray-300 mt-1 text-sm">
        Receive instant analysis of your performance with detailed insights
      </p>
    </div>
  </div>

   {/* Feature: Resume Analsys */}
  <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md">
    <div className="w-14 h-14 flex items-center justify-center bg-sky-500 text-white rounded-xl text-2xl">
     🔍
    </div>
    <div className="from-blue-500 to-cyan-500">
      <h3 className="text-white text-xl font-semibold ">Resume Analysis</h3>
      <p className="text-gray-300 mt-1 text-sm">
        Receive instant analysis and strength of your Resume with detailed insights
      </p>
    </div>
    <br />
  </div>

</div>


    </div>


  );
};

export default Home;
