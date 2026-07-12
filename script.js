/* ═══════════════════════════════════════════════════════════════════════════
   RESUME GENERATOR — Core JavaScript Logic
   Real-time two-way binding between form inputs and the live preview.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ────────── DOM References ──────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // Simple fields: input id → preview element id
  const SIMPLE_FIELDS = {
    fullName:   'prev-name',
    tagline:    'prev-tagline',
    email:      'prev-email',
    degree:     'prev-degree',
    university: 'prev-university',
    graduation: 'prev-graduation',
    school12:   'prev-school12',
    stream12:   'prev-stream12',
    marks12:    'prev-marks12',
    school10:   'prev-school10',
    board10:    'prev-board10',
    marks10:    'prev-marks10',
  };

  // ────────── Utility: sanitize text ──────────
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ────────── Utility: extract display URL ──────────
  function displayURL(url) {
    try {
      const u = new URL(url);
      return u.hostname + u.pathname.replace(/\/$/, '');
    } catch {
      return url;
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // 1. SIMPLE FIELD BINDING
  // ══════════════════════════════════════════════════════════════════════

  Object.entries(SIMPLE_FIELDS).forEach(([inputId, previewId]) => {
    const input = $(`#${inputId}`);
    const preview = $(`#${previewId}`);
    if (!input || !preview) return;

    input.addEventListener('input', () => {
      preview.textContent = input.value || '—';
    });
  });

  // ══════════════════════════════════════════════════════════════════════
  // 2. LINK FIELDS (GitHub / LinkedIn)
  // ══════════════════════════════════════════════════════════════════════

  function bindLink(inputId, previewId) {
    const input = $(`#${inputId}`);
    const preview = $(`#${previewId}`);
    if (!input || !preview) return;

    input.addEventListener('input', () => {
      const val = input.value.trim();
      preview.href = val || '#';
      preview.textContent = val ? displayURL(val) : '—';
    });
  }

  bindLink('github', 'prev-github');
  bindLink('linkedin', 'prev-linkedin');

  // ══════════════════════════════════════════════════════════════════════
  // 3. SKILLS (comma-separated → pills)
  // ══════════════════════════════════════════════════════════════════════

  const skillsInput = $('#skills');
  const skillsPreview = $('#prev-skills');

  function renderSkills() {
    const raw = skillsInput.value;
    const skills = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    skillsPreview.innerHTML = skills
      .map((s) => `<span class="skill-pill">${escapeHTML(s)}</span>`)
      .join('');
  }

  skillsInput.addEventListener('input', renderSkills);
  // Initial render
  renderSkills();

  // ══════════════════════════════════════════════════════════════════════
  // 3b. HOBBIES (comma-separated → pills)
  // ══════════════════════════════════════════════════════════════════════

  const hobbiesInput = $('#hobbies');
  const hobbiesPreview = $('#prev-hobbies');

  function renderHobbies() {
    const raw = hobbiesInput.value;
    const hobbies = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    hobbiesPreview.innerHTML = hobbies
      .map((h) => `<span class="skill-pill">${escapeHTML(h)}</span>`)
      .join('');
  }

  hobbiesInput.addEventListener('input', renderHobbies);
  renderHobbies();

  // ══════════════════════════════════════════════════════════════════════
  // 4. PROJECTS (dynamic add / remove + live preview)
  // ══════════════════════════════════════════════════════════════════════

  const projectsContainer = $('#projects-container');
  const prevProjects = $('#prev-projects');
  const btnAddProject = $('#btn-add-project');

  function getProjectBlocks() {
    return projectsContainer.querySelectorAll('.project-block');
  }

  // Render all projects in preview
  function renderProjects() {
    const blocks = getProjectBlocks();
    let html = '';

    blocks.forEach((block) => {
      const title = block.querySelector('.project-title').value.trim();
      const stack = block.querySelector('.project-stack').value.trim();
      const desc = block.querySelector('.project-desc').value.trim();

      html += `
        <div class="resume-project">
          <div class="resume-project-title">${escapeHTML(title || 'Untitled Project')}</div>
          ${stack ? `<div class="resume-project-stack">${escapeHTML(stack)}</div>` : ''}
          ${desc ? `<p class="resume-project-desc">${escapeHTML(desc)}</p>` : ''}
        </div>`;
    });

    prevProjects.innerHTML = html;
  }

  // Attach input listeners to a project block
  function attachProjectListeners(block) {
    block.querySelectorAll('input, textarea').forEach((el) => {
      el.addEventListener('input', renderProjects);
    });

    const removeBtn = block.querySelector('.btn-remove-project');
    removeBtn.addEventListener('click', () => {
      block.style.animation = 'slideUp 0.2s var(--ease) reverse forwards';
      setTimeout(() => {
        block.remove();
        reindexProjects();
        renderProjects();
        updateRemoveButtons();
      }, 200);
    });
  }

  // Re-label project blocks
  function reindexProjects() {
    getProjectBlocks().forEach((block, i) => {
      block.dataset.index = i;
      block.querySelector('.project-label').textContent = `Project ${i + 1}`;
    });
  }

  // Show/hide remove buttons (hide if only 1 project)
  function updateRemoveButtons() {
    const blocks = getProjectBlocks();
    blocks.forEach((block) => {
      const btn = block.querySelector('.btn-remove-project');
      btn.style.display = blocks.length > 1 ? 'flex' : 'none';
    });
  }

  // Add project handler
  btnAddProject.addEventListener('click', () => {
    const idx = getProjectBlocks().length;
    const block = document.createElement('div');
    block.className = 'project-block';
    block.dataset.index = idx;
    block.innerHTML = `
      <div class="project-block-header">
        <span class="project-label">Project ${idx + 1}</span>
        <button type="button" class="btn-remove-project" title="Remove project" aria-label="Remove project">✕</button>
      </div>
      <div class="field">
        <label>Title</label>
        <input type="text" class="project-title" placeholder="Project name">
      </div>
      <div class="field">
        <label>Tech Stack</label>
        <input type="text" class="project-stack" placeholder="e.g. React, Node">
      </div>
      <div class="field">
        <label>Description</label>
        <textarea class="project-desc" rows="3" placeholder="Brief description…"></textarea>
      </div>`;

    projectsContainer.appendChild(block);
    attachProjectListeners(block);
    updateRemoveButtons();
    renderProjects();

    // Scroll the new block into view
    block.scrollIntoView({ behavior: 'smooth', block: 'center' });
    block.querySelector('.project-title').focus();
  });

  // Initialise existing project blocks
  getProjectBlocks().forEach(attachProjectListeners);
  updateRemoveButtons();
  renderProjects();

  // ══════════════════════════════════════════════════════════════════════
  // 5. PRINT / EXPORT PDF
  // ══════════════════════════════════════════════════════════════════════

  $('#btn-print').addEventListener('click', () => {
    window.print();
  });

})();
