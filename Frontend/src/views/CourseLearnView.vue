<template>
  <div class="bg-gray-50 min-h-screen flex flex-col">
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Course Not Found State -->
    <div v-else-if="!course" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-xl font-medium text-gray-900 mb-1">Không tìm thấy khóa học</h3>
      <p class="text-gray-500 mb-4">Khóa học này không tồn tại hoặc bạn chưa mua quyền truy cập</p>
      <router-link to="/courses"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Quay lại danh sách khóa học
      </router-link>
    </div>

    <!-- Course Content -->
    <div v-else class="flex flex-col flex-grow">
      <!-- Main Content Area - 3 Column Layout -->
      <div class="flex flex-grow overflow-hidden" style="height: calc(100vh - 0px);">
        <!-- Left Sidebar - Course Menu -->
        <div class="w-72 bg-white border-r border-gray-200 flex-shrink-0 hidden md:block overflow-y-auto">
          <div class="h-full flex flex-col">
            <div class="border-b border-gray-200 p-2 flex items-center">
              <router-link to="/my-courses" class="inline-flex items-center text-blue-600 hover:text-blue-800 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </router-link>
              <h2 class="text-sm font-semibold text-gray-900">{{ course.title }}</h2>
            </div>

            <!-- Progress Bar -->
            <div class="p-3 border-b border-gray-200">
              <div class="flex justify-between text-xs text-gray-600 mb-1">
                <div>Tiến độ: {{ progressPercentage }}%</div>
                <div>{{ completedLessons.length }}/{{ getTotalLessons() }}</div>
              </div>
              <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div class="bg-blue-600 h-2" :style="{ width: `${progressPercentage}%` }"></div>
              </div>
            </div>

            <div class="overflow-y-auto flex-grow">
              <div v-for="(section, sectionIndex) in course.sections" :key="sectionIndex"
                class="border-b border-gray-100">
                <div @click="toggleSection(sectionIndex)"
                  class="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50">
                  <h3 class="text-xs font-medium text-gray-900">{{ section.title }}</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-500 transition-transform"
                    :class="{ 'rotate-180': openSections[sectionIndex] }" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div v-show="openSections[sectionIndex]" class="bg-gray-50">
                  <div v-for="(lesson, lessonIndex) in section.lessons" :key="lessonIndex"
                    @click="selectLesson(section, lesson)"
                    class="flex items-center p-2 pl-4 border-t border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                    :class="{ 'bg-blue-50': currentLesson && currentLesson.id === lesson.id }">
                    <div class="flex-shrink-0 mr-2">
                      <div class="w-5 h-5 rounded-full flex items-center justify-center"
                        :class="isLessonCompleted(lesson) ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'">
                        <!-- Completed indicator -->
                        <svg v-if="isLessonCompleted(lesson)" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>

                        <!-- Video icon -->
                        <svg v-else-if="lesson.type === 'video'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <!-- Document icon -->
                        <svg v-else-if="lesson.type === 'document'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>

                        <!-- Quiz icon -->
                        <svg v-else-if="lesson.type === 'quiz'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <!-- Default circle for other types -->
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>

                    <div class="flex-grow overflow-hidden">
                      <div class="flex items-center">
                        <span class="text-xs font-medium truncate" :class="[
                          isLessonCompleted(lesson) ? 'text-gray-500' : 'text-gray-900',
                          currentLesson && currentLesson.id === lesson.id ? 'text-blue-600 font-semibold' : ''
                        ]">
                          {{ lesson.title }}
                        </span>
                      </div>

                      <div class="flex items-center mt-1">
                        <div v-if="lesson.type === 'video'" class="flex items-center text-xs text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span class="text-xs">{{ lesson.duration }}</span>
                        </div>
                        <div v-else-if="lesson.type === 'document'" class="flex items-center text-xs text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span class="text-xs">{{ lesson.duration }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Top Bar -->
          <div class="bg-white border-b border-gray-200 p-2 flex items-center justify-between">
            <div class="flex items-center">
              <!-- Mobile menu button -->
              <button @click="showMobileSidebar = !showMobileSidebar"
                class="md:hidden inline-flex items-center justify-center p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <!-- Lesson navigation -->
              <div class="flex items-center space-x-2">
                <button v-if="previousLesson" @click="selectLesson(previousLesson.section, previousLesson.lesson)"
                  class="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span class="text-xs text-gray-500">{{ currentLessonIndex + 1 }} / {{ getTotalLessons() }}</span>
                <button v-if="nextLesson" @click="selectLesson(nextLesson.section, nextLesson.lesson)"
                  class="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex items-center">
              <button v-if="currentLesson && !isLessonCompleted(currentLesson)" @click="markLessonCompleted"
                class="px-2 py-1 bg-green-600 text-white text-xs rounded mr-2 hover:bg-green-700 transition-colors hidden md:flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Hoàn thành
              </button>
              <button @click="toggleNotes"
                class="px-2 py-1 border border-gray-300 text-xs rounded text-gray-700 hover:bg-gray-50 transition-colors hidden md:flex">
                {{ showNotes ? 'Ẩn ghi chú' : 'Hiện ghi chú' }}
              </button>
            </div>
          </div>

          <!-- Lesson Content -->
          <div class="flex-1 overflow-y-auto">
            <div class="max-w-full">
              <div v-if="currentLesson">
                <h1 v-if="currentLesson.type !== 'video'" class="text-2xl font-bold mb-4">{{ currentLesson.title }}</h1>
                <h1 v-else class="text-2xl font-bold mb-2 px-2">{{ currentLesson.title }}</h1>

                <!-- Video player -->
                <div v-if="currentLesson.type === 'video' && currentLesson.videoUrl" class="">
                  <VideoPlayer :video-url="currentLesson.videoUrl" @timeupdate="currentVideoTime = $event"
                    @add-note="addTimeNote" ref="videoRef" />

                  <!-- Video description -->
                  <div class="prose max-w-none px-2">
                    <p>{{ currentLesson.description }}</p>
                  </div>
                </div>

                <!-- Document content -->
                <div v-else-if="currentLesson.type === 'document' && currentLesson.content"
                  class="mb-6 bg-white rounded-lg shadow p-6">
                  <div class="prose max-w-none" v-html="currentLesson.content"></div>
                </div>

                <!-- Quiz content -->
                <div v-else-if="currentLesson.type === 'quiz' && currentLesson.questions"
                  class="mb-6 bg-white rounded-lg shadow p-6">
                  <h2 class="text-xl font-semibold mb-4">Bài kiểm tra: {{ currentLesson.title }}</h2>

                  <div v-for="(question, qIndex) in currentLesson.questions" :key="qIndex"
                    class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p class="font-medium mb-3">{{ qIndex + 1 }}. {{ question.text }}</p>

                    <div class="space-y-2">
                      <div v-for="(option, oIndex) in question.options" :key="oIndex"
                        class="p-3 bg-white border border-gray-200 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                        :class="{
                          'bg-green-100 border-green-500': quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex === question.correctAnswer,
                          'bg-red-100 border-red-500': quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== question.correctAnswer,
                          'bg-blue-50 border-blue-300': !quizSubmitted && quizAnswers[qIndex] === oIndex
                        }" @click="selectQuizAnswer(qIndex, oIndex)">
                        <span>{{ option }}</span>
                      </div>
                    </div>

                    <div v-if="quizSubmitted && quizAnswers[qIndex] !== undefined" class="mt-3 p-3 rounded-md"
                      :class="quizAnswers[qIndex] === question.correctAnswer ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
                      <p v-if="quizAnswers[qIndex] === question.correctAnswer" class="font-medium">Chính xác!</p>
                      <p v-else class="font-medium">Chưa chính xác. Đáp án đúng là: {{
                        question.options[question.correctAnswer] }}</p>
                      <p class="mt-1">{{ question.explanation }}</p>
                    </div>
                  </div>

                  <div class="mt-4 flex justify-between">
                    <button class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      @click="quizAnswers = {}, quizSubmitted = false">Làm lại</button>
                    <button v-if="isQuizComplete && !quizSubmitted"
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      @click="submitQuiz">Nộp bài</button>
                  </div>

                  <!-- Quiz results -->
                  <div v-if="quizSubmitted" class="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                    <h3 class="text-lg font-medium mb-2">Kết quả: {{ quizScore }}%</h3>
                    <p>Bạn đã hoàn thành bài kiểm tra!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar - Notes -->
        <div v-if="showNotes" class="w-60 bg-white border-l border-gray-200 flex-shrink-0 hidden md:flex flex-col">
          <div class="border-b border-gray-200 p-2 flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-900">Ghi chú theo thời gian</h3>
            <button @click="addTimeNote"
              class="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ formatTime(currentVideoTime) }}
            </button>
          </div>

          <div class="flex-grow overflow-y-auto">
            <!-- Time-based Notes -->
            <div class="p-2">
              <div v-for="(note, index) in currentNote.timeNotes" :key="index"
                class="border border-gray-200 rounded p-2 text-xs hover:bg-gray-50 mb-2">
                <div class="flex justify-between items-center mb-1">
                  <button @click="seekToTime(note.time)"
                    class="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ formatTime(note.time) }}
                  </button>
                  <button @click="deleteTimeNote(index)" class="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <p class="text-gray-700">{{ note.text }}</p>
              </div>

              <div v-if="currentNote.timeNotes && currentNote.timeNotes.length === 0"
                class="text-center text-gray-500 italic text-xs p-2">
                Chưa có ghi chú theo thời gian
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Time Note Dialog -->
    <div v-if="showAddTimeNote" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Thêm ghi chú tại {{ formatTime(currentVideoTime) }}</h3>
        <textarea v-model="timeNoteText"
          class="w-full border border-gray-300 rounded p-2 mb-4 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nhập ghi chú của bạn ở đây..." autofocus></textarea>
        <div class="flex justify-end space-x-2">
          <button @click="showAddTimeNote = false"
            class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
            Hủy
          </button>
          <button @click="saveTimeNote" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VideoPlayer from '../components/VideoPlayer.vue';
import courses from '../data/courses';

export default {
  components: {
    VideoPlayer
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    // State
    const loading = ref(true);
    const course = ref(null);
    const currentSection = ref(null);
    const currentLesson = ref(null);
    const openSections = ref({});
    const completedLessons = ref([]);
    const currentNote = ref({ generalNote: '', timeNotes: [] });
    const showNotes = ref(true);
    const showMobileSidebar = ref(false);
    const quizAnswers = ref({});
    const quizSubmitted = ref(false);
    const quizScore = ref(0);
    const videoRef = ref(null);
    const currentVideoTime = ref(0);
    const showAddTimeNote = ref(false);
    const timeNoteText = ref('');

    // Load course
    const loadCourse = () => {
      loading.value = true;

      // Simulate API call
      setTimeout(() => {
        const slug = route.params.slug;
        course.value = courses.find(c => c.slug === slug) || null;

        if (course.value) {
          // Open first section by default
          if (course.value.sections.length > 0) {
            openSections.value[0] = true;

            // Load first lesson by default
            if (course.value.sections[0].lessons.length > 0) {
              currentSection.value = course.value.sections[0];
              currentLesson.value = course.value.sections[0].lessons[0];
            }
          }

          // Load completed lessons from localStorage
          const savedCompletedLessons = localStorage.getItem(`course_${course.value.id}_completed`);
          if (savedCompletedLessons) {
            completedLessons.value = JSON.parse(savedCompletedLessons);
          }

          // Load notes from localStorage
          loadNotes();
        }

        loading.value = false;
      }, 500);
    };

    // Toggle section visibility
    const toggleSection = (sectionIndex) => {
      openSections.value[sectionIndex] = !openSections.value[sectionIndex];
    };

    // Select lesson
    const selectLesson = (section, lesson) => {
      currentSection.value = section;
      currentLesson.value = lesson;
      showMobileSidebar.value = false;

      // Load notes for this lesson
      loadNotes();
    };

    // Check if lesson is completed
    const isLessonCompleted = (lesson) => {
      return completedLessons.value.includes(lesson.id);
    };

    // Mark lesson as completed
    const markLessonCompleted = () => {
      if (currentLesson.value && !isLessonCompleted(currentLesson.value)) {
        completedLessons.value.push(currentLesson.value.id);
        localStorage.setItem(`course_${course.value.id}_completed`, JSON.stringify(completedLessons.value));
      }
    };

    // Save notes
    const saveNotes = () => {
      if (currentLesson.value) {
        localStorage.setItem(`course_${course.value.id}_lesson_${currentLesson.value.id}_notes`, JSON.stringify(currentNote.value));
      }
    };

    // Load notes
    const loadNotes = () => {
      if (currentLesson.value) {
        const savedNotes = localStorage.getItem(`course_${course.value.id}_lesson_${currentLesson.value.id}_notes`);
        if (savedNotes) {
          currentNote.value = JSON.parse(savedNotes);
          // Ensure timeNotes array exists
          if (!currentNote.value.timeNotes) {
            currentNote.value.timeNotes = [];
          }
        } else {
          currentNote.value = { generalNote: '', timeNotes: [] };
        }
      }
    };

    // Toggle notes sidebar
    const toggleNotes = () => {
      showNotes.value = !showNotes.value;
    };

    // Get total lessons
    const getTotalLessons = () => {
      if (!course.value) return 0;

      let total = 0;
      course.value.sections.forEach(section => {
        total += section.lessons.length;
      });

      return total;
    };

    // Calculate progress percentage
    const progressPercentage = computed(() => {
      const total = getTotalLessons();
      if (total === 0) return 0;

      return Math.round((completedLessons.value.length / total) * 100);
    });

    // Previous and next lesson navigation
    const previousLesson = computed(() => {
      if (!course.value || !currentLesson.value) return null;

      let prevLesson = null;
      let prevSection = null;

      for (let i = 0; i < course.value.sections.length; i++) {
        const section = course.value.sections[i];
        for (let j = 0; j < section.lessons.length; j++) {
          const lesson = section.lessons[j];

          if (lesson.id === currentLesson.value.id) {
            if (j > 0) {
              // Previous lesson in same section
              return { section, lesson: section.lessons[j - 1] };
            } else if (i > 0) {
              // Last lesson in previous section
              const prevSection = course.value.sections[i - 1];
              return {
                section: prevSection,
                lesson: prevSection.lessons[prevSection.lessons.length - 1]
              };
            }
          }
        }
      }

      return null;
    });

    const nextLesson = computed(() => {
      if (!course.value || !currentLesson.value) return null;

      let foundCurrent = false;

      for (let i = 0; i < course.value.sections.length; i++) {
        const section = course.value.sections[i];
        for (let j = 0; j < section.lessons.length; j++) {
          const lesson = section.lessons[j];

          if (foundCurrent) {
            return { section, lesson };
          }

          if (lesson.id === currentLesson.value.id) {
            foundCurrent = true;

            if (j < section.lessons.length - 1) {
              // Next lesson in same section
              return { section, lesson: section.lessons[j + 1] };
            } else if (i < course.value.sections.length - 1) {
              // First lesson in next section
              const nextSection = course.value.sections[i + 1];
              return {
                section: nextSection,
                lesson: nextSection.lessons[0]
              };
            }
          }
        }
      }

      return null;
    });

    // Current lesson index
    const currentLessonIndex = computed(() => {
      if (!course.value || !currentLesson.value) return 0;

      let index = 0;

      for (const section of course.value.sections) {
        for (const lesson of section.lessons) {
          if (lesson.id === currentLesson.value.id) {
            return index;
          }
          index++;
        }
      }

      return 0;
    });

    // Select quiz answer
    const selectQuizAnswer = (questionIndex, answerIndex) => {
      if (quizSubmitted.value) return;

      quizAnswers.value[questionIndex] = answerIndex;
    };

    // Check if quiz is complete (all questions answered)
    const isQuizComplete = computed(() => {
      if (!currentLesson.value || currentLesson.value.type !== 'quiz') return false;

      for (let i = 0; i < currentLesson.value.questions.length; i++) {
        if (quizAnswers.value[i] === undefined) return false;
      }

      return true;
    });

    // Submit quiz
    const submitQuiz = () => {
      if (!isQuizComplete.value) return;

      let correctAnswers = 0;

      for (let i = 0; i < currentLesson.value.questions.length; i++) {
        if (quizAnswers.value[i] === currentLesson.value.questions[i].correctAnswer) {
          correctAnswers++;
        }
      }

      quizScore.value = Math.round((correctAnswers / currentLesson.value.questions.length) * 100);
      quizSubmitted.value = true;

      // Mark lesson as completed
      markLessonCompleted();
    };

    // Add time note
    const addTimeNote = () => {
      showAddTimeNote.value = true;
    };

    // Save time note
    const saveTimeNote = () => {
      // Save time note to notes object
      if (currentLesson.value && timeNoteText.value.trim() !== '') {
        const timeNote = {
          time: currentVideoTime.value,
          text: timeNoteText.value
        };

        // Ensure timeNotes array exists
        if (!currentNote.value.timeNotes) {
          currentNote.value.timeNotes = [];
        }

        currentNote.value.timeNotes.push(timeNote);

        // Sort notes by time
        currentNote.value.timeNotes.sort((a, b) => a.time - b.time);

        // Save to localStorage
        saveNotes();

        // Reset form
        showAddTimeNote.value = false;
        timeNoteText.value = '';
      } else {
        // Just close the dialog if no text was entered
        showAddTimeNote.value = false;
        timeNoteText.value = '';
      }
    };

    // Delete time note
    const deleteTimeNote = (index) => {
      currentNote.value.timeNotes.splice(index, 1);
      saveNotes();
    };

    // Seek to time
    const seekToTime = (time) => {
      if (videoRef.value && videoRef.value.seekTo) {
        videoRef.value.seekTo(time);
      }
    };

    // Format time
    const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = Math.floor(time % 60);

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Watch route changes
    watch(
      () => route.params.slug,
      (newSlug) => {
        if (newSlug) {
          loadCourse();
        }
      }
    );

    // Load course on mount
    onMounted(() => {
      loadCourse();
    });

    return {
      loading,
      course,
      currentSection,
      currentLesson,
      openSections,
      completedLessons,
      currentNote,
      showNotes,
      showMobileSidebar,
      quizAnswers,
      quizSubmitted,
      quizScore,
      previousLesson,
      nextLesson,
      currentLessonIndex,
      progressPercentage,
      isQuizComplete,
      loadCourse,
      toggleSection,
      selectLesson,
      isLessonCompleted,
      markLessonCompleted,
      saveNotes,
      toggleNotes,
      getTotalLessons,
      selectQuizAnswer,
      submitQuiz,
      videoRef,
      currentVideoTime,
      showAddTimeNote,
      timeNoteText,
      addTimeNote,
      saveTimeNote,
      deleteTimeNote,
      seekToTime,
      formatTime
    };
  }
};
</script>

<style scoped>
/* Ẩn header và footer khi ở trang học */
:deep(header), :deep(footer) {
  display: none !important;
}

/* Đảm bảo nội dung chiếm toàn màn hình */
:deep(body) {
  overflow: hidden;
}
</style>
