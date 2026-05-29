export default function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950 py-24 px-6 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center bg-sky-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
          Smarter Learning with AI ✨
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
          Study Smarter with
          <span className="text-sky-500">
            {" "}BrainSpark
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-8">
          Transform PDFs, notes, documents,
          and images into smart flashcards
          and quizzes. Learn faster, revise
          better, and boost productivity with
          AI-powered studying.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <a href="#flashcards">
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-md hover:shadow-lg">
              Get Started
            </button>
          </a>

          <a href="#about">
            <button className="border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Learn More
            </button>
          </a>
        </div>

        {/* Small Text */}
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          Trusted by students for smarter revision 📚
        </p>
      </div>
    </section>
  );
}