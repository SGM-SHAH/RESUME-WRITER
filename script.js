/* ═══════════════════════════════════════════════════════════════════════════
   RESUME GENERATOR — Core JavaScript Logic
   Real-time two-way binding between form inputs and the live preview.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ────────── DOM References ──────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

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
  // 1. PERSONAL DETAILS & CONTACT
  // ══════════════════════════════════════════════════════════════════════

  const fullNameInput = $('#fullName');
  const taglineInput = $('#tagline');
  const emailInput = $('#email');
  const githubInput = $('#github');
  const linkedinInput = $('#linkedin');

  const prevName = $('#prev-name');
  const prevTagline = $('#prev-tagline');
  const prevContact = $('#prev-contact');
  const prevHeader = $('#prev-header');

  function renderHeader() {
    const name = fullNameInput ? fullNameInput.value.trim() : '';
    const tagline = taglineInput ? taglineInput.value.trim() : '';

    if (prevName) {
      prevName.textContent = name;
      prevName.style.display = name ? '' : 'none';
    }

    if (prevTagline) {
      prevTagline.textContent = tagline;
      prevTagline.style.display = tagline ? '' : 'none';
    }

    renderContact();

    const hasHeaderContent = Boolean(name || tagline || (prevContact && prevContact.children.length > 0));
    if (prevHeader) {
      prevHeader.style.display = hasHeaderContent ? '' : 'none';
    }
  }

  function renderContact() {
    if (!prevContact) return;

    const email = emailInput ? emailInput.value.trim() : '';
    const github = githubInput ? githubInput.value.trim() : '';
    const linkedin = linkedinInput ? linkedinInput.value.trim() : '';

    const items = [];

    if (email) {
      items.push(`<span id="prev-email">${escapeHTML(email)}</span>`);
    }
    if (github) {
      items.push(`<a id="prev-github" href="${escapeHTML(github)}" target="_blank" rel="noopener">${escapeHTML(displayURL(github))}</a>`);
    }
    if (linkedin) {
      items.push(`<a id="prev-linkedin" href="${escapeHTML(linkedin)}" target="_blank" rel="noopener">${escapeHTML(displayURL(linkedin))}</a>`);
    }

    if (items.length > 0) {
      prevContact.innerHTML = items.join('<span class="sep"> · </span>');
      prevContact.style.display = '';
    } else {
      prevContact.innerHTML = '';
      prevContact.style.display = 'none';
    }
  }

  [fullNameInput, taglineInput, emailInput, githubInput, linkedinInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        renderHeader();
        updateEmptyState();
      });
    }
  });

  // ══════════════════════════════════════════════════════════════════════
  // 2. EDUCATION
  // ══════════════════════════════════════════════════════════════════════

  const degreeInput = $('#degree');
  const universityInput = $('#university');
  const graduationInput = $('#graduation');

  const school12Input = $('#school12');
  const stream12Input = $('#stream12');
  const marks12Input = $('#marks12');

  const school10Input = $('#school10');
  const board10Input = $('#board10');
  const marks10Input = $('#marks10');

  const prevEntryDegree = $('#prev-entry-degree');
  const prevEntry12th = $('#prev-entry-12th');
  const prevEntry10th = $('#prev-entry-10th');

  const prevSectionEducation = $('#prev-section-education');
  const prevDividerEducation = $('#prev-divider-education');

  function updateEducation() {
    const degree = degreeInput ? degreeInput.value.trim() : '';
    const university = universityInput ? universityInput.value.trim() : '';
    const graduation = graduationInput ? graduationInput.value.trim() : '';

    const school12 = school12Input ? school12Input.value.trim() : '';
    const stream12 = stream12Input ? stream12Input.value.trim() : '';
    const marks12 = marks12Input ? marks12Input.value.trim() : '';

    const school10 = school10Input ? school10Input.value.trim() : '';
    const board10 = board10Input ? board10Input.value.trim() : '';
    const marks10 = marks10Input ? marks10Input.value.trim() : '';

    const hasDegree = Boolean(degree || university || graduation);
    const has12th = Boolean(school12 || stream12 || marks12);
    const has10th = Boolean(school10 || board10 || marks10);

    if (prevEntryDegree) {
      prevEntryDegree.style.display = hasDegree ? '' : 'none';
      const elDegree = $('#prev-degree');
      const elUniv = $('#prev-university');
      const elGrad = $('#prev-graduation');
      if (elDegree) elDegree.textContent = degree;
      if (elUniv) elUniv.textContent = university;
      if (elGrad) elGrad.textContent = graduation;
    }

    if (prevEntry12th) {
      prevEntry12th.style.display = has12th ? '' : 'none';
      const elSchool = $('#prev-school12');
      const elStream = $('#prev-stream12');
      const elMarks = $('#prev-marks12');
      if (elSchool) elSchool.textContent = school12;
      if (elStream) elStream.textContent = stream12;
      if (elMarks) elMarks.textContent = marks12;
    }

    if (prevEntry10th) {
      prevEntry10th.style.display = has10th ? '' : 'none';
      const elSchool = $('#prev-school10');
      const elBoard = $('#prev-board10');
      const elMarks = $('#prev-marks10');
      if (elSchool) elSchool.textContent = school10;
      if (elBoard) elBoard.textContent = board10;
      if (elMarks) elMarks.textContent = marks10;
    }

    const hasAnyEdu = hasDegree || has12th || has10th;
    if (prevSectionEducation) {
      prevSectionEducation.style.display = hasAnyEdu ? '' : 'none';
    }
    if (prevDividerEducation) {
      prevDividerEducation.style.display = hasAnyEdu ? '' : 'none';
    }
  }

  [
    degreeInput, universityInput, graduationInput,
    school12Input, stream12Input, marks12Input,
    school10Input, board10Input, marks10Input
  ].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        updateEducation();
        updateEmptyState();
      });
    }
  });

  // ══════════════════════════════════════════════════════════════════════
  // 3. TECHNICAL SKILLS
  // ══════════════════════════════════════════════════════════════════════

  const skillsInput = $('#skills');
  const skillsPreview = $('#prev-skills');
  const prevSectionSkills = $('#prev-section-skills');
  const prevDividerSkills = $('#prev-divider-skills');

  function renderSkills() {
    const raw = skillsInput ? skillsInput.value : '';
    const skills = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (skills.length > 0) {
      skillsPreview.innerHTML = skills
        .map((s) => `<span class="skill-pill">${escapeHTML(s)}</span>`)
        .join('');
      if (prevSectionSkills) prevSectionSkills.style.display = '';
      if (prevDividerSkills) prevDividerSkills.style.display = '';
    } else {
      skillsPreview.innerHTML = '';
      if (prevSectionSkills) prevSectionSkills.style.display = 'none';
      if (prevDividerSkills) prevDividerSkills.style.display = 'none';
    }
  }

  if (skillsInput) {
    skillsInput.addEventListener('input', () => {
      renderSkills();
      updateEmptyState();
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // 4. PROJECTS
  // ══════════════════════════════════════════════════════════════════════

  const projectsContainer = $('#projects-container');
  const prevProjects = $('#prev-projects');
  const btnAddProject = $('#btn-add-project');
  const prevSectionProjects = $('#prev-section-projects');
  const prevDividerProjects = $('#prev-divider-projects');

  function getProjectBlocks() {
    return projectsContainer.querySelectorAll('.project-block');
  }

  function renderProjects() {
    const blocks = getProjectBlocks();
    let html = '';
    let validCount = 0;

    blocks.forEach((block) => {
      const title = (block.querySelector('.project-title')?.value || '').trim();
      const stack = (block.querySelector('.project-stack')?.value || '').trim();
      const desc = (block.querySelector('.project-desc')?.value || '').trim();

      // Skip rendering if block is completely blank
      if (!title && !stack && !desc) return;

      validCount++;
      html += `
        <div class="resume-project">
          <div class="resume-project-title">${escapeHTML(title || 'Project')}</div>
          ${stack ? `<div class="resume-project-stack">${escapeHTML(stack)}</div>` : ''}
          ${desc ? `<p class="resume-project-desc">${escapeHTML(desc)}</p>` : ''}
        </div>`;
    });

    prevProjects.innerHTML = html;

    if (validCount > 0) {
      if (prevSectionProjects) prevSectionProjects.style.display = '';
      if (prevDividerProjects) prevDividerProjects.style.display = '';
    } else {
      if (prevSectionProjects) prevSectionProjects.style.display = 'none';
      if (prevDividerProjects) prevDividerProjects.style.display = 'none';
    }
  }

  function attachProjectListeners(block) {
    block.querySelectorAll('input, textarea').forEach((el) => {
      el.addEventListener('input', () => {
        renderProjects();
        updateEmptyState();
      });
    });

    const removeBtn = block.querySelector('.btn-remove-project');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        block.style.animation = 'slideUp 0.2s var(--ease) reverse forwards';
        setTimeout(() => {
          block.remove();
          reindexProjects();
          renderProjects();
          updateRemoveButtons();
          updateEmptyState();
        }, 200);
      });
    }
  }

  function reindexProjects() {
    getProjectBlocks().forEach((block, i) => {
      block.dataset.index = i;
      const label = block.querySelector('.project-label');
      if (label) label.textContent = `Project ${i + 1}`;
    });
  }

  function updateRemoveButtons() {
    const blocks = getProjectBlocks();
    blocks.forEach((block) => {
      const btn = block.querySelector('.btn-remove-project');
      if (btn) {
        btn.style.display = blocks.length > 1 ? 'flex' : 'none';
      }
    });
  }

  if (btnAddProject) {
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
      updateEmptyState();

      block.scrollIntoView({ behavior: 'smooth', block: 'center' });
      block.querySelector('.project-title').focus();
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // 5. HOBBIES
  // ══════════════════════════════════════════════════════════════════════

  const hobbiesInput = $('#hobbies');
  const hobbiesPreview = $('#prev-hobbies');
  const prevSectionHobbies = $('#prev-section-hobbies');
  const prevDividerHobbies = $('#prev-divider-hobbies');

  function renderHobbies() {
    const raw = hobbiesInput ? hobbiesInput.value : '';
    const hobbies = raw
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);

    if (hobbies.length > 0) {
      hobbiesPreview.innerHTML = hobbies
        .map((h) => `<span class="skill-pill">${escapeHTML(h)}</span>`)
        .join('');
      if (prevSectionHobbies) prevSectionHobbies.style.display = '';
      if (prevDividerHobbies) prevDividerHobbies.style.display = '';
    } else {
      hobbiesPreview.innerHTML = '';
      if (prevSectionHobbies) prevSectionHobbies.style.display = 'none';
      if (prevDividerHobbies) prevDividerHobbies.style.display = 'none';
    }
  }

  if (hobbiesInput) {
    hobbiesInput.addEventListener('input', () => {
      renderHobbies();
      updateEmptyState();
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // 6. EMPTY STATE HELPER
  // ══════════════════════════════════════════════════════════════════════

  const emptyHint = $('#resume-empty-hint');

  function updateEmptyState() {
    const hasHeader = Boolean(
      (fullNameInput && fullNameInput.value.trim()) ||
      (taglineInput && taglineInput.value.trim()) ||
      (emailInput && emailInput.value.trim()) ||
      (githubInput && githubInput.value.trim()) ||
      (linkedinInput && linkedinInput.value.trim())
    );

    const hasEdu = Boolean(
      (degreeInput && degreeInput.value.trim()) ||
      (universityInput && universityInput.value.trim()) ||
      (graduationInput && graduationInput.value.trim()) ||
      (school12Input && school12Input.value.trim()) ||
      (stream12Input && stream12Input.value.trim()) ||
      (marks12Input && marks12Input.value.trim()) ||
      (school10Input && school10Input.value.trim()) ||
      (board10Input && board10Input.value.trim()) ||
      (marks10Input && marks10Input.value.trim())
    );

    const hasSkills = Boolean(skillsInput && skillsInput.value.trim());

    let hasProjects = false;
    getProjectBlocks().forEach((block) => {
      if (
        (block.querySelector('.project-title')?.value || '').trim() ||
        (block.querySelector('.project-stack')?.value || '').trim() ||
        (block.querySelector('.project-desc')?.value || '').trim()
      ) {
        hasProjects = true;
      }
    });

    const hasHobbies = Boolean(hobbiesInput && hobbiesInput.value.trim());

    const hasAnyContent = hasHeader || hasEdu || hasSkills || hasProjects || hasHobbies;

    if (emptyHint) {
      emptyHint.style.display = hasAnyContent ? 'none' : 'block';
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // 7. PRINT / EXPORT PDF & TITLE HANDLING
  // ══════════════════════════════════════════════════════════════════════

  const originalDocumentTitle = document.title;

  function preparePrintTitle() {
    const name = fullNameInput ? fullNameInput.value.trim() : '';
    if (name) {
      document.title = `${name} - Resume`;
    } else {
      document.title = 'Resume';
    }
  }

  function restorePrintTitle() {
    document.title = originalDocumentTitle;
  }

  // Handle Ctrl+P or browser print menus
  window.addEventListener('beforeprint', preparePrintTitle);
  window.addEventListener('afterprint', restorePrintTitle);

  // Handle the "Print / Export PDF" button
  const btnPrint = $('#btn-print');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      preparePrintTitle();
      window.print();
      // Restore title in case afterprint doesn't fire synchronously
      setTimeout(restorePrintTitle, 1000);
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // 8. INITIALIZE
  // ══════════════════════════════════════════════════════════════════════

  getProjectBlocks().forEach(attachProjectListeners);
  updateRemoveButtons();

  renderHeader();
  updateEducation();
  renderSkills();
  renderProjects();
  renderHobbies();
  updateEmptyState();

})();
