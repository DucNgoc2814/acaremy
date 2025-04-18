// alert.js - Custom alert utility using SweetAlert2 CDN with enhanced styling

// Store pending alerts if Swal is not loaded yet
let pendingAlerts = [];

// Check if SweetAlert2 is loaded and process any pending alerts
const processPendingAlerts = () => {
  if (typeof window.Swal !== 'undefined' && pendingAlerts.length > 0) {
    pendingAlerts.forEach(options => {
      showSweetAlert(options);
    });
    pendingAlerts = [];
  }
};

export const showAlert = (options) => {
  // If SweetAlert2 is already loaded, show the alert immediately
  if (typeof window.Swal !== 'undefined') {
    showSweetAlert(options);
    return;
  }
  
  // If SweetAlert2 is not loaded yet, add to pending alerts and load the script
  pendingAlerts.push(options);
  
  // Only load the script once
  if (!document.getElementById('sweetalert2-script')) {
    const script = document.createElement('script');
    script.id = 'sweetalert2-script';
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    script.async = true;
    
    script.onload = () => {
      // Process any pending alerts once the script is loaded
      processPendingAlerts();
    };
    
    document.head.appendChild(script);
  }
};

const showSweetAlert = (options) => {
  // Make sure Swal is defined
  if (typeof window.Swal === 'undefined') {
    console.error('SweetAlert2 is not loaded');
    return;
  }

  const defaultOptions = {
    title: 'Thông báo',
    icon: 'info',
    confirmButtonText: 'OK',
    confirmButtonColor: '#4F46E5', // Indigo-600
    customClass: {
      popup: 'acaremy-popup',
      title: 'acaremy-title',
      htmlContainer: 'acaremy-content',
      confirmButton: 'acaremy-confirm-button',
      cancelButton: 'acaremy-cancel-button',
      icon: 'acaremy-icon'
    },
    buttonsStyling: true
  };
  
  // Only add animation classes if animate.css is loaded
  if (document.getElementById('animate-css')) {
    defaultOptions.showClass = {
      popup: 'animate__animated animate__fadeInUp animate__faster'
    };
    defaultOptions.hideClass = {
      popup: 'animate__animated animate__fadeOutDown animate__faster'
    };
  }
  
  try {
    window.Swal.fire({
      ...defaultOptions,
      ...options
    });
  } catch (error) {
    console.error('Error showing SweetAlert:', error);
  }
};

// Success alert
export const showSuccess = (message, title = 'Thành công!') => {
  showAlert({
    title,
    text: message,
    icon: 'success'
  });
};

// Error alert
export const showError = (message, title = 'Lỗi!') => {
  showAlert({
    title,
    text: message,
    icon: 'error'
  });
};

// Warning alert
export const showWarning = (message, title = 'Cảnh báo!') => {
  showAlert({
    title,
    text: message,
    icon: 'warning'
  });
};

// Confirmation dialog
export const showConfirm = (message, confirmCallback, cancelCallback = null, title = 'Xác nhận') => {
  showAlert({
    title,
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      if (confirmCallback) confirmCallback();
    } else if (cancelCallback) {
      cancelCallback();
    }
  });
};

// Add SweetAlert2 CSS to head with custom styling
export const initSweetAlert = () => {
  try {
    // Add SweetAlert2 base CSS
    if (!document.getElementById('sweetalert2-css')) {
      const link = document.createElement('link');
      link.id = 'sweetalert2-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css';
      document.head.appendChild(link);
    }
    
    // Add animate.css for animations
    if (!document.getElementById('animate-css')) {
      const animateLink = document.createElement('link');
      animateLink.id = 'animate-css';
      animateLink.rel = 'stylesheet';
      animateLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
      document.head.appendChild(animateLink);
    }
    
    // Add custom styles
    if (!document.getElementById('sweetalert2-custom-css')) {
      const style = document.createElement('style');
      style.id = 'sweetalert2-custom-css';
      style.textContent = `
        .swal2-popup {
          font-family: 'Inter', sans-serif;
          border-radius: 0.75rem;
          padding: 1.25rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .swal2-title {
          font-weight: 600;
          font-size: 1.25rem;
          color: #1F2937;
        }
        
        .swal2-html-container {
          color: #4B5563;
          font-size: 0.875rem;
        }
        
        .swal2-confirm {
          background-color: #4F46E5 !important;
          padding: 0.5rem 1.25rem;
          font-weight: 500;
          border-radius: 0.375rem;
          transition: all 0.2s ease;
        }
        
        .swal2-confirm:hover {
          background-color: #4338CA !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
        }
        
        .swal2-cancel {
          background-color: #F3F4F6 !important;
          color: #4B5563 !important;
          padding: 0.5rem 1.25rem;
          font-weight: 500;
          border-radius: 0.375rem;
          transition: all 0.2s ease;
        }
        
        .swal2-cancel:hover {
          background-color: #E5E7EB !important;
          transform: translateY(-1px);
        }
        
        /* Custom icon colors */
        .swal2-icon.swal2-success {
          border-color: #D1FAE5;
          color: #10B981 !important;
        }
        
        .swal2-icon.swal2-success .swal2-success-ring {
          border-color: #D1FAE5;
        }
        
        .swal2-icon.swal2-success [class^='swal2-success-line'] {
          background-color: #10B981 !important;
        }
        
        .swal2-icon.swal2-error {
          border-color: #FEE2E2 !important;
          color: #EF4444 !important;
        }
        
        .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {
          background-color: #EF4444 !important;
        }
        
        .swal2-icon.swal2-warning {
          border-color: #FEF3C7 !important;
          color: #F59E0B !important;
        }
        
        .swal2-icon.swal2-info {
          border-color: #DBEAFE !important;
          color: #3B82F6 !important;
        }
        
        .swal2-icon.swal2-question {
          border-color: #E0E7FF !important;
          color: #6366F1 !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Preload SweetAlert2 script
    if (!document.getElementById('sweetalert2-script')) {
      const script = document.createElement('script');
      script.id = 'sweetalert2-script';
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      script.async = true;
      document.head.appendChild(script);
    }
  } catch (error) {
    console.error('Error initializing SweetAlert:', error);
  }
};
