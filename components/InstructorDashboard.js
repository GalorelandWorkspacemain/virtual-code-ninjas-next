// components/InstructorDashboard.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InstructorDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newModule, setNewModule] = useState({ title: "", content: "" });
  const router = useRouter();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch("/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  const createCourse = async (e) => {
    e.preventDefault();
    await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newCourseTitle }),
    });
    setNewCourseTitle("");
    fetchCourses();
  };

  const createModule = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;

    await fetch("/api/modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newModule,
        courseId: selectedCourse.id,
      }),
    });
    setNewModule({ title: "", content: "" });
    fetchCourses();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-all"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-medium">Back</span>
            </button>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-indigo-900 mb-2">
            Instructor Dashboard
          </h1>
          <p className="text-lg text-gray-600">Welcome back, {user.name}! 👋</p>
        </div>

        {/* Create Course Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">📚</span>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Create New Course
            </h2>
          </div>
          <form
            onSubmit={createCourse}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={newCourseTitle}
              onChange={(e) => setNewCourseTitle(e.target.value)}
              placeholder="Enter course title..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all whitespace-nowrap"
            >
              ✨ Create Course
            </button>
          </form>
        </section>

        {/* Course List */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">🎓</span>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Your Courses
            </h2>
          </div>

          {courses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">
                No courses yet. Create your first course above! 🚀
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all shadow-md hover:shadow-xl ${
                    selectedCourse?.id === course.id
                      ? "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-500 ring-4 ring-indigo-200"
                      : "bg-white hover:bg-gray-50 border-gray-200 hover:border-indigo-300"
                  }`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 mb-3">
                    <span>📖</span>
                    <span>{course.modules?.length || 0} modules</span>
                  </div>
                  {selectedCourse?.id === course.id && (
                    <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mt-3 pt-3 border-t border-indigo-200">
                      <span>✓</span>
                      <span>Selected - Add modules below</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Create Module for Selected Course */}
        {selectedCourse && (
          <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 border-2 border-green-300">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">➕</span>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Add Module to "{selectedCourse.title}"
              </h2>
            </div>

            <form onSubmit={createModule} className="space-y-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Module Title
                </label>
                <input
                  type="text"
                  value={newModule.title}
                  onChange={(e) =>
                    setNewModule({ ...newModule, title: e.target.value })
                  }
                  placeholder="e.g., Introduction to Variables"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all bg-white"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Module Content
                </label>
                <textarea
                  value={newModule.content}
                  onChange={(e) =>
                    setNewModule({ ...newModule, content: e.target.value })
                  }
                  placeholder="Write your lesson content here (Markdown supported)..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all h-40 resize-y bg-white"
                  required
                />
              </div>

              <div className="flex flex-row gap-6 pt-10 mt-10 pb-4 border-t-2 border-green-200">
                <button
                  type="submit"
                  className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all"
                >
                  ✅ Add Module
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="px-10 py-4 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 shadow-md hover:shadow-lg transition-all"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>

            {/* Show existing modules */}
            {selectedCourse.modules?.length > 0 && (
              <div className="mt-8 pt-6 border-t-2 border-green-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span>📑</span>
                  <span>
                    Existing Modules ({selectedCourse.modules.length})
                  </span>
                </h3>
                <ul className="space-y-3">
                  {selectedCourse.modules.map((module, index) => (
                    <li
                      key={module.id}
                      className="p-4 bg-white rounded-lg shadow-sm border border-green-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-green-600 font-bold">
                          {index + 1}.
                        </span>
                        <span className="text-sm md:text-base text-gray-800 font-medium">
                          {module.title}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}