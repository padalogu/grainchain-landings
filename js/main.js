document.addEventListener('DOMContentLoaded', () => {
  // --- Smooth Scroll for CTA buttons ---
  const openModalButtons = document.querySelectorAll('.open-modal-btn');
  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const formSection = document.getElementById('formulario');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });
  }

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.88;
    
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  // Initial trigger and bind scroll event
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // --- Modal Form Logic ---
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const diagnosticForm = document.getElementById('diagnostic-form');

  if (modalOverlay) {
    // Close modal on close button click
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      });
    }

    // Close modal on clicking overlay background
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Form Submission Handling
    if (diagnosticForm) {
      diagnosticForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success visual feedback
        const container = modalOverlay.querySelector('.modal-container');
        const originalContent = container.innerHTML;
        
        container.innerHTML = `
          <button class="modal-close" id="modal-success-close" aria-label="Cerrar" style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer;">&times;</button>
          <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;">✓</div>
            <h3 style="font-size: 1.8rem; color: var(--text-primary); margin-bottom: 12px;">¡Solicitud Recibida!</h3>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">Hemos registrado tu información. Un especialista de GrainChain se pondrá en contacto contigo en las próximas 24 horas hábiles para coordinar la sesión de diagnóstico.</p>
            <button class="btn-primary" id="modal-success-btn" style="width: 100%;">Entendido</button>
          </div>
        `;

        // Success dialog closing actions
        const closeSuccess = () => {
          modalOverlay.classList.remove('active');
          document.body.style.overflow = '';
          // Restore form HTML after overlay transitions out
          setTimeout(() => {
            container.innerHTML = originalContent;
            // Re-bind overlay close events
            const newClose = container.querySelector('#modal-close');
            if (newClose) {
              newClose.addEventListener('click', () => {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
              });
            }
            // Reset form
            const newForm = container.querySelector('#diagnostic-form');
            if (newForm) {
              newForm.reset();
            }
          }, 400);
        };

        container.querySelector('#modal-success-close').addEventListener('click', closeSuccess);
        container.querySelector('#modal-success-btn').addEventListener('click', closeSuccess);
      });
    }
  }

  // --- Swaying Decorative Leaves Effect ---
  const leaves = document.querySelectorAll('.leaf-decor');
  window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    leaves.forEach((leaf, idx) => {
      const direction = idx % 2 === 0 ? 1 : -1;
      const rotation = (scrollPercent * 50 * direction) + (idx * 15);
      const yOffset = scrollPercent * 100 * direction;
      leaf.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
    });
  });
});
