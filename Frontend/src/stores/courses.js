import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCourseStore = defineStore('courses', () => {
  // State
  const courses = ref([
    {
      id: 1,
      slug: 'vuejs-co-ban',
      title: 'Vue.js cơ bản',
      description: 'Khóa học Vue.js cơ bản giúp bạn làm quen với framework Vue.js 3 và Composition API.',
      price: 500000,
      image: 'https://vuejs.org/images/logo.png',
      duration: '10 giờ',
      level: 'Cơ bản',
      topics: ['Vue 3', 'Composition API', 'Components', 'Reactivity'],
      instructor: 'Nguyễn Văn A',
      salesCount: 73
    },
    {
      id: 2,
      slug: 'laravel-cho-nguoi-moi-bat-dau',
      title: 'Laravel cho người mới bắt đầu',
      description: 'Khóa học Laravel cơ bản giúp bạn hiểu về MVC và xây dựng ứng dụng web với Laravel.',
      price: 750000,
      image: 'https://laravel.com/img/logomark.min.svg',
      duration: '15 giờ',
      level: 'Cơ bản',
      topics: ['PHP', 'Laravel', 'MVC', 'Eloquent ORM'],
      instructor: 'Trần Thị B',
      salesCount: 45
    },
    {
      id: 3,
      slug: 'lap-trinh-fullstack-voi-mevn-stack',
      title: 'Lập trình Fullstack với MEVN Stack',
      description: 'Khóa học fullstack giúp bạn xây dựng ứng dụng web hoàn chỉnh với MongoDB, Express, Vue và Node.js.',
      price: 1200000,
      image: 'https://miro.medium.com/max/1400/1*aTmvGS9vEqxXTnpXIr7pKg.png',
      duration: '30 giờ',
      level: 'Trung cấp',
      topics: ['MongoDB', 'Express.js', 'Vue.js', 'Node.js', 'RESTful API'],
      instructor: 'Lê Văn C',
      salesCount: 124
    },
    {
      id: 4,
      slug: 'tailwindcss-tu-a-den-z',
      title: 'TailwindCSS từ A đến Z',
      description: 'Học cách sử dụng TailwindCSS để thiết kế giao diện web hiện đại và responsive.',
      price: 450000,
      image: 'https://tailwindcss.com/_next/static/media/tailwindcss-mark.79614a5f61617ba49a0891494521226b.svg',
      duration: '8 giờ',
      level: 'Cơ bản',
      topics: ['CSS', 'TailwindCSS', 'Responsive Design', 'Utility-first'],
      instructor: 'Phạm Thị D',
      salesCount: 89
    },
    {
      id: 5,
      slug: 'lap-trinh-di-dong-voi-vue-native',
      title: 'Lập trình di động với Vue Native',
      description: 'Học cách xây dựng ứng dụng di động đa nền tảng với Vue Native và React Native.',
      price: 850000,
      image: 'https://vuejs.org/images/logo.png',
      duration: '20 giờ',
      level: 'Nâng cao',
      topics: ['Vue Native', 'React Native', 'Mobile Development', 'Cross-platform'],
      instructor: 'Hoàng Văn E',
      salesCount: 37
    },
    {
      id: 6,
      slug: 'pinia-state-management-cho-vue-3',
      title: 'Pinia - State Management cho Vue 3',
      description: 'Tìm hiểu về Pinia - giải pháp quản lý state hiện đại cho Vue 3.',
      price: 350000,
      image: 'https://pinia.vuejs.org/logo.svg',
      duration: '5 giờ',
      level: 'Trung cấp',
      topics: ['Vue 3', 'Pinia', 'State Management', 'Store'],
      instructor: 'Nguyễn Văn F',
      salesCount: 62
    },
    {
      id: 7,
      slug: 'xay-dung-api-voi-laravel',
      title: 'Xây dựng API với Laravel',
      description: 'Học cách xây dựng RESTful API với Laravel và Laravel Sanctum cho xác thực.',
      price: 680000,
      image: 'https://laravel.com/img/logomark.min.svg',
      duration: '12 giờ',
      level: 'Trung cấp',
      topics: ['Laravel', 'API', 'RESTful', 'Sanctum', 'JSON'],
      instructor: 'Nguyễn Thị G',
      salesCount: 56
    },
    {
      id: 8,
      slug: 'docker-cho-lap-trinh-vien',
      title: 'Docker cho lập trình viên',
      description: 'Tìm hiểu về Docker và cách sử dụng container để triển khai ứng dụng web.',
      price: 790000,
      image: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png',
      duration: '15 giờ',
      level: 'Trung cấp',
      topics: ['Docker', 'Container', 'DevOps', 'CI/CD'],
      instructor: 'Trần Văn H',
      salesCount: 42
    },
    {
      id: 9,
      slug: 'nuxtjs-cho-ung-dung-vuejs',
      title: 'Nuxt.js cho ứng dụng Vue.js',
      description: 'Xây dựng ứng dụng Vue.js với framework Nuxt.js để tối ưu SEO và hiệu suất.',
      price: 550000,
      image: 'https://nuxtjs.org/design-kit/colored-logo.svg',
      duration: '10 giờ',
      level: 'Trung cấp',
      topics: ['Vue.js', 'Nuxt.js', 'SSR', 'SEO'],
      instructor: 'Lê Thị I',
      salesCount: 38
    },
    {
      id: 10,
      slug: 'typescript-cho-lap-trinh-vien-javascript',
      title: 'TypeScript cho lập trình viên JavaScript',
      description: 'Học cách sử dụng TypeScript để viết code JavaScript an toàn hơn với kiểu dữ liệu tĩnh.',
      price: 480000,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png',
      duration: '8 giờ',
      level: 'Trung cấp',
      topics: ['TypeScript', 'JavaScript', 'Type Safety', 'OOP'],
      instructor: 'Phạm Văn J',
      salesCount: 67
    },
    {
      id: 11,
      slug: 'inertiajs-voi-laravel-va-vue',
      title: 'Inertia.js với Laravel và Vue',
      description: 'Xây dựng ứng dụng SPA với Inertia.js, Laravel và Vue mà không cần API.',
      price: 620000,
      image: 'https://avatars.githubusercontent.com/u/47703742?s=200&v=4',
      duration: '12 giờ',
      level: 'Nâng cao',
      topics: ['Inertia.js', 'Laravel', 'Vue.js', 'SPA'],
      instructor: 'Hoàng Thị K',
      salesCount: 29
    },
    {
      id: 12,
      slug: 'kiem-thu-ung-dung-laravel-voi-phpunit',
      title: 'Kiểm thử ứng dụng Laravel với PHPUnit',
      description: 'Học cách viết unit test và feature test cho ứng dụng Laravel với PHPUnit.',
      price: 520000,
      image: 'https://phpunit.de/img/phpunit.svg',
      duration: '10 giờ',
      level: 'Trung cấp',
      topics: ['Laravel', 'PHPUnit', 'Testing', 'TDD'],
      instructor: 'Nguyễn Văn L',
      salesCount: 34
    },
    {
      id: 13,
      slug: 'xay-dung-ung-dung-realtime-voi-laravel-va-pusher',
      title: 'Xây dựng ứng dụng Realtime với Laravel và Pusher',
      description: 'Tạo ứng dụng realtime với Laravel, Pusher và Vue.js cho chat và thông báo.',
      price: 580000,
      image: 'https://avatars.githubusercontent.com/u/739550?s=200&v=4',
      duration: '8 giờ',
      level: 'Nâng cao',
      topics: ['Laravel', 'Pusher', 'WebSockets', 'Realtime'],
      instructor: 'Trần Thị M',
      salesCount: 41
    },
    {
      id: 14,
      slug: 'xay-dung-progressive-web-app-voi-vue',
      title: 'Xây dựng Progressive Web App với Vue',
      description: 'Học cách chuyển đổi ứng dụng Vue.js thành Progressive Web App (PWA) với workbox.',
      price: 490000,
      image: 'https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/XdBRIoVnC6s0GfzYvRsl.svg',
      duration: '8 giờ',
      level: 'Trung cấp',
      topics: ['Vue.js', 'PWA', 'Service Workers', 'Offline'],
      instructor: 'Lê Văn N',
      salesCount: 47
    },
    {
      id: 15,
      slug: 'graphql-voi-laravel-va-vue',
      title: 'GraphQL với Laravel và Vue',
      description: 'Tìm hiểu về GraphQL và cách triển khai với Laravel và Vue.js.',
      price: 720000,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png',
      duration: '15 giờ',
      level: 'Nâng cao',
      topics: ['GraphQL', 'Laravel', 'Vue.js', 'API'],
      instructor: 'Phạm Thị O',
      salesCount: 32
    },
    {
      id: 16,
      slug: 'xay-dung-microservices-voi-laravel',
      title: 'Xây dựng Microservices với Laravel',
      description: 'Học cách phân tách ứng dụng Laravel thành các microservices và giao tiếp giữa chúng.',
      price: 950000,
      image: 'https://laravel.com/img/logomark.min.svg',
      duration: '20 giờ',
      level: 'Nâng cao',
      topics: ['Laravel', 'Microservices', 'API Gateway', 'Docker'],
      instructor: 'Hoàng Văn P',
      salesCount: 25
    },
    {
      id: 17,
      slug: 'toi-uu-hieu-suat-cho-ung-dung-laravel',
      title: 'Tối ưu hiệu suất cho ứng dụng Laravel',
      description: 'Các kỹ thuật tối ưu hiệu suất cho ứng dụng Laravel lớn, bao gồm caching và queues.',
      price: 680000,
      image: 'https://laravel.com/img/logomark.min.svg',
      duration: '12 giờ',
      level: 'Nâng cao',
      topics: ['Laravel', 'Performance', 'Caching', 'Queues'],
      instructor: 'Nguyễn Thị Q',
      salesCount: 39
    },
    {
      id: 18,
      slug: 'xay-dung-theme-wordpress-voi-laravel-mix',
      title: 'Xây dựng theme WordPress với Laravel Mix',
      description: 'Học cách xây dựng theme WordPress hiện đại sử dụng Laravel Mix và Blade templates.',
      price: 540000,
      image: 'https://s.w.org/style/images/about/WordPress-logotype-standard.png',
      duration: '10 giờ',
      level: 'Trung cấp',
      topics: ['WordPress', 'Laravel Mix', 'Blade', 'Theme Development'],
      instructor: 'Trần Văn R',
      salesCount: 53
    }
  ])
  
  const userCourses = ref([])

  // Getters
  const getAllCourses = computed(() => courses.value)
  
  const getFeaturedCourses = computed(() => courses.value)
  
  const getCourseById = computed(() => (id) => {
    return courses.value.find(course => course.id === parseInt(id))
  })
  
  const getCourseBySlug = computed(() => (slug) => {
    return courses.value.find(course => course.slug === slug)
  })
  
  const getPurchasedCourses = computed(() => userCourses.value)

  // Actions
  function purchaseCourse(courseId) {
    const course = getCourseById.value(courseId)
    if (course && !userCourses.value.some(c => c.id === course.id)) {
      userCourses.value.push(course)
      // Increment sales count when a course is purchased
      course.salesCount += 1
      return true
    }
    return false
  }

  return { 
    courses, 
    userCourses, 
    getAllCourses, 
    getFeaturedCourses,
    getCourseById, 
    getCourseBySlug,
    getPurchasedCourses,
    purchaseCourse
  }
})
