// Portfolio Website JavaScript

// Initialize AOS Animation
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.custom-navbar');
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
    navbar.style.padding = '10px 0';
    navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.backgroundColor = 'var(--primary-color)';
    navbar.style.padding = '15px 0';
    navbar.style.boxShadow = 'none';
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;

  // Simple validation
  if (!name || !email) {
    showAlert('Please fill in all required fields.', 'error');
    return;
  }

  // Simulate form submission
  showAlert('Thank you for your message! I will get back to you soon.', 'success');
  this.reset();
});

// Alert function
function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`;
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  // Add styles for custom alert
  alertDiv.style.position = 'fixed';
  alertDiv.style.top = '20px';
  alertDiv.style.right = '20px';
  alertDiv.style.zIndex = '9999';
  alertDiv.style.minWidth = '300px';

  document.body.appendChild(alertDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv);
    }
  }, 5000);
}

// Skill progress bars animation
function animateSkills() {
  const skillItems = document.querySelectorAll('.skill-item');

  skillItems.forEach(item => {
    const progressBar = item.querySelector('.progress-bar');
    const width = progressBar.style.width;

    // Reset width for animation
    progressBar.style.width = '0';

    // Animate after a short delay
    setTimeout(() => {
      progressBar.style.width = width;
    }, 500);
  });
}

// Intersection Observer for skill animation
const skillsSection = document.getElementById('skills');
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

if (skillsSection) {
  observer.observe(skillsSection);
}

// Project filter functionality (if needed in future)
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');

  projects.forEach(project => {
    if (category === 'all') {
      project.style.display = 'block';
    } else {
      const tags = project.querySelector('.project-tags').textContent.toLowerCase();
      if (tags.includes(category.toLowerCase())) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    }
  });
}

// Typing effect for hero section (optional)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
  }

  // Add loading animation
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
  loader.innerHTML = `
        <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;

  document.body.appendChild(loader);

  // Remove loader after page load
  window.addEventListener('load', function() {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }, 1000);
  });
});

// Dark mode toggle (optional feature)
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  // Save preference to localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Add dark mode styles
const darkModeStyles = `
    <style>
        .dark-mode {
            background-color: #1a1a1a;
            color: #f0f0f0;
        }

        .dark-mode .bg-light {
            background-color: #2d2d2d !important;
        }

        .dark-mode .skill-category,
        .dark-mode .project-card,
        .dark-mode .contact-info,
        .dark-mode .contact-form,
        .dark-mode .certification-item {
            background-color: #2d2d2d;
            color: #f0f0f0;
        }

        .dark-mode .form-control {
            background-color: #3d3d3d;
            border-color: #4d4d4d;
            color: #f0f0f0;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', darkModeStyles);
