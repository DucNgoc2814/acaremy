export const courses = [
  {
    id: 1,
    slug: 'vue-js-co-ban',
    title: 'Vue.js cơ bản',
    description: 'Khóa học Vue.js cơ bản giúp bạn làm quen với framework Vue.js 3 và Composition API.',
    price: 500000,
    image: 'https://vuejs.org/images/logo.png',
    duration: '10 giờ',
    level: 'Cơ bản',
    topics: ['Vue 3', 'Composition API', 'Components', 'Reactivity'],
    instructor: 'Nguyễn Văn A',
    salesCount: 73,
    sections: [
      {
        id: 1,
        title: 'Giới thiệu',
        lessons: [
          {
            id: 101,
            title: 'Giới thiệu khóa học',
            type: 'video',
            duration: '5:30',
            videoUrl: 'https://www.youtube.com/embed/jEEu2WEImPg',
            description: 'Tổng quan về khóa học Vue.js cơ bản'
          },
          {
            id: 102,
            title: 'Cài đặt môi trường',
            type: 'document',
            duration: '10:00',
            documentUrl: '#',
            content: `
              <h2>Cài đặt môi trường phát triển</h2>
              <p>Để bắt đầu với Vue.js, bạn cần cài đặt các công cụ sau:</p>
              <ul>
                <li>Node.js (phiên bản LTS)</li>
                <li>npm hoặc yarn</li>
                <li>Visual Studio Code</li>
                <li>Vue.js DevTools (extension cho Chrome/Firefox)</li>
              </ul>
              <h3>Cài đặt Vue CLI</h3>
              <p>Sau khi cài đặt Node.js, bạn có thể cài đặt Vue CLI bằng lệnh:</p>
              <pre><code>npm install -g @vue/cli</code></pre>
              <p>Hoặc sử dụng yarn:</p>
              <pre><code>yarn global add @vue/cli</code></pre>
            `
          }
        ]
      },
      {
        id: 2,
        title: 'Vue.js Cơ bản',
        lessons: [
          {
            id: 103,
            title: 'Tạo dự án Vue đầu tiên',
            type: 'video',
            duration: '12:45',
            videoUrl: 'https://www.youtube.com/embed/jEEu2WEImPg',
            description: 'Học cách tạo một dự án Vue.js mới từ đầu'
          },
          {
            id: 104,
            title: 'Components trong Vue',
            type: 'video',
            duration: '15:20',
            videoUrl: 'https://www.youtube.com/embed/jEEu2WEImPg',
            description: 'Tìm hiểu về components trong Vue.js'
          },
          {
            id: 106,
            title: 'Tài liệu: Cấu trúc dự án Vue',
            type: 'document',
            duration: '10:00',
            documentUrl: '#',
            content: `
              <h2>Cấu trúc dự án Vue.js</h2>
              <p>Một dự án Vue.js chuẩn có cấu trúc thư mục như sau:</p>
              <pre><code>
├── public/          # Tài nguyên tĩnh không cần qua xử lý
│   ├── favicon.ico  # Icon cho trang web
│   └── index.html   # Template HTML
├── src/             # Mã nguồn chính
│   ├── assets/      # Tài nguyên cần qua xử lý (hình ảnh, CSS, ...)
│   ├── components/  # Các component Vue
│   ├── views/       # Các component trang
│   ├── router/      # Cấu hình định tuyến
│   ├── store/       # Quản lý trạng thái (Vuex)
│   ├── App.vue      # Component gốc
│   └── main.js      # Điểm khởi đầu ứng dụng
├── .gitignore       # Cấu hình Git
├── babel.config.js  # Cấu hình Babel
├── package.json     # Quản lý phụ thuộc
└── README.md        # Tài liệu dự án
              </code></pre>
              
              <h3>Các thư mục quan trọng</h3>
              <ul>
                <li><strong>components/</strong>: Chứa các component có thể tái sử dụng</li>
                <li><strong>views/</strong>: Chứa các component trang, thường tương ứng với các route</li>
                <li><strong>router/</strong>: Cấu hình định tuyến cho ứng dụng</li>
                <li><strong>store/</strong>: Quản lý trạng thái toàn cục với Vuex</li>
              </ul>
              
              <h3>Các file quan trọng</h3>
              <ul>
                <li><strong>main.js</strong>: Điểm khởi đầu của ứng dụng, nơi khởi tạo Vue app</li>
                <li><strong>App.vue</strong>: Component gốc chứa toàn bộ ứng dụng</li>
                <li><strong>package.json</strong>: Quản lý các phụ thuộc và script</li>
              </ul>
            `
          },
          {
            id: 107,
            title: 'Tài liệu: Lifecycle hooks trong Vue',
            type: 'document',
            duration: '8:00',
            documentUrl: '#',
            content: `
              <h2>Lifecycle Hooks trong Vue.js</h2>
              <p>Vue.js cung cấp các lifecycle hooks cho phép bạn thực thi mã ở các giai đoạn khác nhau trong vòng đời của một component.</p>
              
              <div class="diagram">
                <img src="https://v3.vuejs.org/images/lifecycle.png" alt="Vue Lifecycle Diagram" style="max-width: 100%;">
              </div>
              
              <h3>Các hooks chính</h3>
              <ul>
                <li><strong>beforeCreate</strong>: Được gọi trước khi component được khởi tạo</li>
                <li><strong>created</strong>: Được gọi sau khi component được khởi tạo</li>
                <li><strong>beforeMount</strong>: Được gọi trước khi component được gắn vào DOM</li>
                <li><strong>mounted</strong>: Được gọi sau khi component được gắn vào DOM</li>
                <li><strong>beforeUpdate</strong>: Được gọi trước khi component được cập nhật</li>
                <li><strong>updated</strong>: Được gọi sau khi component được cập nhật</li>
                <li><strong>beforeUnmount</strong>: Được gọi trước khi component bị hủy</li>
                <li><strong>unmounted</strong>: Được gọi sau khi component bị hủy</li>
              </ul>
              
              <h3>Ví dụ sử dụng</h3>
              <pre><code>
export default {
  created() {
    console.log('Component đã được khởi tạo')
    // Thích hợp cho việc gọi API, khởi tạo dữ liệu
  },
  mounted() {
    console.log('Component đã được gắn vào DOM')
    // Thích hợp cho việc tương tác với DOM
  },
  beforeUnmount() {
    console.log('Component sắp bị hủy')
    // Thích hợp cho việc dọn dẹp (cleanup)
  }
}
              </code></pre>
            `
          },
          {
            id: 105,
            title: 'Kiểm tra kiến thức: Vue.js cơ bản',
            type: 'quiz',
            description: 'Kiểm tra kiến thức của bạn về Vue.js cơ bản',
            questions: [
              {
                text: 'Lệnh nào được sử dụng để tạo một dự án Vue.js mới?',
                options: [
                  'vue create my-project',
                  'npm create vue my-project',
                  'vue new my-project',
                  'vue init my-project'
                ],
                correctAnswer: 0,
                explanation: 'Lệnh vue create my-project được sử dụng để tạo một dự án Vue.js mới với Vue CLI.'
              },
              {
                text: 'Directive nào trong Vue.js được sử dụng để ràng buộc dữ liệu hai chiều?',
                options: [
                  'v-bind',
                  'v-model',
                  'v-on',
                  'v-two-way'
                ],
                correctAnswer: 1,
                explanation: 'v-model được sử dụng để ràng buộc dữ liệu hai chiều trong Vue.js.'
              },
              {
                text: 'Phương thức nào được sử dụng để tạo một ứng dụng Vue 3?',
                options: [
                  'new Vue()',
                  'Vue.createApp()',
                  'Vue.application()',
                  'Vue.create()'
                ],
                correctAnswer: 1,
                explanation: 'Vue.createApp() được sử dụng để tạo một ứng dụng Vue 3.'
              }
            ]
          }
        ]
      }
    ]
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
    salesCount: 45,
    sections: [
      {
        id: 1,
        title: 'Giới thiệu Laravel',
        lessons: [
          {
            id: 201,
            title: 'Giới thiệu khóa học',
            type: 'video',
            duration: '8:30',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Tổng quan về khóa học Laravel cơ bản'
          },
          {
            id: 202,
            title: 'Cài đặt môi trường',
            type: 'document',
            duration: '10:00',
            documentUrl: '#',
            content: `
              <h2>Cài đặt môi trường phát triển</h2>
              <p>Để bắt đầu với khóa học này, bạn cần cài đặt các công cụ sau:</p>
              <ul>
                <li>PHP (>= 8.0)</li>
                <li>Composer</li>
                <li>MySQL hoặc PostgreSQL</li>
                <li>Visual Studio Code</li>
              </ul>
              <h3>Cài đặt Composer</h3>
              <p>Tải xuống và cài đặt Composer từ <a href="https://getcomposer.org/" target="_blank">trang chủ</a>.</p>
            `
          }
        ]
      },
      {
        id: 2,
        title: 'Cơ bản về Laravel',
        lessons: [
          {
            id: 203,
            title: 'Tạo dự án Laravel mới',
            type: 'video',
            duration: '12:45',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Học cách tạo một dự án Laravel mới từ đầu'
          },
          {
            id: 204,
            title: 'Routing trong Laravel',
            type: 'video',
            duration: '15:20',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Tìm hiểu về routing trong Laravel'
          },
          {
            id: 205,
            title: 'Kiểm tra kiến thức: Laravel cơ bản',
            type: 'quiz',
            description: 'Kiểm tra kiến thức của bạn về Laravel cơ bản',
            questions: [
              {
                text: 'Lệnh nào được sử dụng để tạo một dự án Laravel mới?',
                options: [
                  'laravel new project-name',
                  'composer create-project laravel/laravel project-name',
                  'npm create laravel project-name',
                  'php artisan new project'
                ],
                correctAnswer: 1,
                explanation: 'Lệnh composer create-project laravel/laravel project-name được sử dụng để tạo một dự án Laravel mới.'
              },
              {
                text: 'File nào trong Laravel chứa cấu hình cơ sở dữ liệu?',
                options: [
                  'config/app.php',
                  'config/database.php',
                  '.env',
                  'database.php'
                ],
                correctAnswer: 2,
                explanation: 'File .env chứa cấu hình cơ sở dữ liệu và các cấu hình môi trường khác.'
              },
              {
                text: 'Đâu là lệnh để tạo một controller mới trong Laravel?',
                options: [
                  'php artisan make:controller UserController',
                  'php artisan controller:make UserController',
                  'php artisan new:controller UserController',
                  'php artisan create:controller UserController'
                ],
                correctAnswer: 0,
                explanation: 'Lệnh php artisan make:controller UserController được sử dụng để tạo một controller mới.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 19,
    slug: 'laravel-tu-co-ban-den-nang-cao',
    title: 'Laravel từ cơ bản đến nâng cao',
    description: 'Khóa học toàn diện về Laravel Framework giúp bạn xây dựng ứng dụng web chuyên nghiệp.',
    price: 850000,
    image: 'https://laravel.com/img/logomark.min.svg',
    duration: '20 giờ',
    level: 'Trung cấp',
    topics: ['PHP', 'Laravel', 'MVC', 'Eloquent ORM', 'API'],
    instructor: 'Nguyễn Văn A',
    salesCount: 75,
    sections: [
      {
        id: 1,
        title: 'Giới thiệu Laravel',
        lessons: [
          {
            id: 1901,
            title: 'Giới thiệu khóa học',
            type: 'video',
            duration: '8:30',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Tổng quan về khóa học Laravel từ cơ bản đến nâng cao'
          },
          {
            id: 1902,
            title: 'Cài đặt môi trường',
            type: 'document',
            duration: '10:00',
            documentUrl: '#',
            content: `
              <h2>Cài đặt môi trường phát triển</h2>
              <p>Để bắt đầu với khóa học này, bạn cần cài đặt các công cụ sau:</p>
              <ul>
                <li>PHP 8.1 hoặc cao hơn</li>
                <li>Composer</li>
                <li>MySQL hoặc MariaDB</li>
                <li>Node.js và NPM</li>
              </ul>
              <p>Bạn cũng có thể sử dụng các công cụ như Laravel Homestead hoặc Laravel Sail để thiết lập môi trường phát triển nhanh chóng.</p>
            `
          }
        ]
      },
      {
        id: 2,
        title: 'Kiến thức nâng cao',
        lessons: [
          {
            id: 1903,
            title: 'Eloquent ORM nâng cao',
            type: 'video',
            duration: '15:45',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Tìm hiểu sâu về Eloquent ORM trong Laravel'
          },
          {
            id: 1904,
            title: 'Xây dựng API với Laravel',
            type: 'video',
            duration: '12:20',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Học cách xây dựng RESTful API với Laravel'
          },
          {
            id: 1905,
            title: 'Kiểm tra kiến thức',
            type: 'quiz',
            duration: '10:00',
            questions: [
              {
                text: 'Eloquent ORM trong Laravel là gì?',
                options: [
                  'Một thư viện JavaScript',
                  'Một ORM (Object-Relational Mapping) cho cơ sở dữ liệu',
                  'Một công cụ quản lý giao diện',
                  'Một framework CSS'
                ],
                correctAnswer: 1,
                explanation: 'Eloquent ORM là một Object-Relational Mapping cho phép tương tác với cơ sở dữ liệu thông qua các đối tượng PHP.'
              },
              {
                text: 'Lệnh nào sau đây tạo một model và migration trong Laravel?',
                options: [
                  'php artisan make:model User',
                  'php artisan create:model User --migration',
                  'php artisan make:model User -m',
                  'php artisan model:create User'
                ],
                correctAnswer: 2,
                explanation: 'Lệnh php artisan make:model User -m sẽ tạo cả model và migration tương ứng.'
              }
            ]
          }
        ]
      }
    ]
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
    slug: 'nuxt-js-cho-ung-dung-vue-js',
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
    slug: 'inertia-js-voi-laravel-va-vue',
    title: 'Inertia.js với Laravel và Vue',
    description: 'Xây dựng ứng dụng SPA với Inertia.js, kết hợp Laravel và Vue mà không cần API riêng biệt.',
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
    slug: 'testing-trong-laravel-voi-phpunit',
    title: 'Testing trong Laravel với PHPUnit',
    description: 'Học cách viết test cho ứng dụng Laravel với PHPUnit, bao gồm unit test và feature test.',
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
];

export default courses;
