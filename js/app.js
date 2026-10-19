(function () {
  "use strict";

  const projects = Array.isArray(window.NATIVA_PROJECTS) ? window.NATIVA_PROJECTS : [];
  const config = window.NATIVA_CONFIG || {};
  const grid = document.querySelector("[data-project-grid]");
  const filters = document.querySelector("[data-filters]");
  const resultsCount = document.querySelector("[data-results-count]");
  const dialog = document.querySelector("[data-project-dialog]");
  const dialogImage = document.querySelector("[data-dialog-image]");
  const dialogThumbnails = document.querySelector("[data-dialog-thumbnails]");
  const featuredProjects = new Set(["mueble-integrado", "comedor"]);
  let activeProject = null;

  const uniqueCategories = ["Todos", ...new Set(projects.map((project) => project.category))];

  function renderFilters() {
    if (!filters) return;

    filters.innerHTML = uniqueCategories
      .map(
        (category, index) => `
          <button
            class="filter-button${index === 0 ? " is-active" : ""}"
            type="button"
            data-filter="${category}"
            aria-pressed="${index === 0 ? "true" : "false"}"
          >${category}</button>
        `,
      )
      .join("");

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;

      filters.querySelectorAll("[data-filter]").forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("is-active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      filterProjects(button.dataset.filter);
    });
  }

  function renderProjects() {
    if (!grid) return;

    grid.innerHTML = projects
      .map(
        (project) => `
          <article
            class="project-card${featuredProjects.has(project.id) ? " is-wide" : ""}"
            data-category="${project.category}"
            data-project-card="${project.id}"
          >
            <button class="project-card-button" type="button" data-open-project="${project.id}">
              <span class="project-image">
                <img src="${project.cover}" alt="${project.alt}" loading="lazy" />
              </span>
              <span class="project-meta">
                <span>
                  <span class="project-category">${project.category}</span>
                  <span class="project-title">${project.title}</span>
                </span>
                <span class="project-arrow" aria-hidden="true">↗</span>
              </span>
            </button>
          </article>
        `,
      )
      .join("");

    updateResultsCount(projects.length, "Todos");
  }

  function filterProjects(category) {
    let visible = 0;

    document.querySelectorAll("[data-project-card]").forEach((card) => {
      const show = category === "Todos" || card.dataset.category === category;
      card.hidden = !show;
      if (show) visible += 1;
    });

    updateResultsCount(visible, category);
  }

  function updateResultsCount(count, category) {
    if (!resultsCount) return;
    const label = count === 1 ? "proyecto" : "proyectos";
    resultsCount.textContent = `${count} ${label}${category === "Todos" ? "" : ` en ${category}`}`;
  }

  function openProject(projectId) {
    const project = projects.find((item) => item.id === projectId);
    if (!project || !dialog) return;

    activeProject = project;
    document.querySelector("[data-dialog-category]").textContent = project.category;
    document.querySelector("[data-dialog-title]").textContent = project.title;
    document.querySelector("[data-dialog-description]").textContent = project.description;
    setDialogImage(0);
    renderDialogThumbnails(project);

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      document.body.classList.add("dialog-open");
    }
  }

  function setDialogImage(index) {
    if (!activeProject || !dialogImage) return;
    const imagePath = activeProject.images[index];
    dialogImage.src = imagePath;
    dialogImage.alt = `${activeProject.alt}, vista ${index + 1} de ${activeProject.images.length}`;

    dialogThumbnails?.querySelectorAll("[data-image-index]").forEach((thumbnail) => {
      const isActive = Number(thumbnail.dataset.imageIndex) === index;
      thumbnail.classList.toggle("is-active", isActive);
      thumbnail.setAttribute("aria-pressed", String(isActive));
    });
  }

  function renderDialogThumbnails(project) {
    if (!dialogThumbnails) return;

    dialogThumbnails.innerHTML = project.images
      .map(
        (image, index) => `
          <button
            class="thumbnail-button${index === 0 ? " is-active" : ""}"
            type="button"
            data-image-index="${index}"
            aria-label="Ver fotografía ${index + 1} de ${project.images.length}"
            aria-pressed="${index === 0 ? "true" : "false"}"
          >
            <img src="${image}" alt="" />
          </button>
        `,
      )
      .join("");
  }

  function closeDialog() {
    if (!dialog?.open) return;
    dialog.close();
    document.body.classList.remove("dialog-open");
  }

  function setupProjectInteractions() {
    document.addEventListener("click", (event) => {
      const openButton = event.target.closest("[data-open-project]");
      if (openButton) openProject(openButton.dataset.openProject);
    });

    document.querySelector("[data-dialog-close]")?.addEventListener("click", closeDialog);

    dialogThumbnails?.addEventListener("click", (event) => {
      const thumbnail = event.target.closest("[data-image-index]");
      if (thumbnail) setDialogImage(Number(thumbnail.dataset.imageIndex));
    });

    dialog?.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });

    dialog?.addEventListener("close", () => document.body.classList.remove("dialog-open"));

    document.querySelector("[data-dialog-contact]")?.addEventListener("click", () => {
      const message = document.querySelector("#message");
      const interest = document.querySelector("#interest");
      if (activeProject && message && !message.value) {
        message.value = `Me interesa el proyecto “${activeProject.title}” y quisiera recibir más información.`;
      }
      if (interest) interest.value = "Mobiliario";
      closeDialog();
    });
  }

  function setupMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-menu]");
    if (!toggle || !menu) return;

    function setMenu(open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    }

    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (event) => {
      if (event.target.matches("a")) setMenu(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  function setupHeader() {
    const header = document.querySelector("[data-header]");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setContactValue(selector, value, type) {
    const element = document.querySelector(selector);
    if (!element) return;

    if (!value) {
      element.textContent = "POR DEFINIR";
      return;
    }

    if (type === "email") {
      const link = document.createElement("a");
      link.href = `mailto:${value}`;
      link.textContent = value;
      element.replaceChildren(link);
      return;
    }

    element.textContent = value;
  }

  function setupContactInformation() {
    setContactValue("[data-contact-whatsapp]", config.whatsappDisplay || "");
    setContactValue("[data-contact-email]", config.email || "", "email");
    setContactValue("[data-contact-location]", config.location || "");

    const socialLinks = document.querySelector("[data-social-links]");
    if (!socialLinks) return;

    const links = [
      { label: "Instagram", url: config.instagramUrl },
      { label: "Facebook", url: config.facebookUrl },
    ].filter((item) => item.url);

    if (links.length === 0) {
      socialLinks.innerHTML = '<span class="placeholder-note">Redes sociales: POR DEFINIR</span>';
      return;
    }

    links.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = item.label;
      socialLinks.appendChild(link);
    });
  }

  function setupContactForm() {
    const form = document.querySelector("[data-contact-form]");
    const status = document.querySelector("[data-form-status]");
    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const fields = ["name", "interest", "message"];
      let valid = true;

      fields.forEach((fieldName) => {
        const field = form.elements[fieldName];
        const error = form.querySelector(`[data-error-for="${fieldName}"]`);
        const empty = !String(formData.get(fieldName) || "").trim();
        field.closest(".field")?.classList.toggle("has-error", empty);
        if (error) error.textContent = empty ? "Completa este campo." : "";
        if (empty) valid = false;
      });

      if (!valid) {
        status.textContent = "Revisa los campos señalados antes de continuar.";
        form.querySelector(".has-error input, .has-error select, .has-error textarea")?.focus();
        return;
      }

      const whatsappNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
      if (!whatsappNumber) {
        status.textContent = "WhatsApp aún no está configurado. Completa whatsappNumber en js/config.js.";
        return;
      }

      const text = [
        "Hola, Nativa Studio.",
        `Mi nombre es ${String(formData.get("name")).trim()}.`,
        `Me interesa: ${String(formData.get("interest")).trim()}.`,
        `Idea: ${String(formData.get("message")).trim()}`,
      ].join("\n");

      status.textContent = "Abriendo WhatsApp para que revises y envíes tu mensaje…";
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });

    form.addEventListener("input", (event) => {
      const field = event.target.closest(".field");
      if (!field) return;
      field.classList.remove("has-error");
      const error = field.querySelector(".field-error");
      if (error) error.textContent = "";
    });
  }

  function setupRevealAnimations() {
    const targets = document.querySelectorAll(
      ".manifesto > *, .section-heading, .project-card, .featured-copy, .about-content, .contact > *",
    );

    if (!("IntersectionObserver" in window)) return;
    targets.forEach((target) => target.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    targets.forEach((target) => observer.observe(target));
  }

  renderFilters();
  renderProjects();
  setupProjectInteractions();
  setupMenu();
  setupHeader();
  setupContactInformation();
  setupContactForm();
  setupRevealAnimations();
  document.querySelector("[data-current-year]").textContent = new Date().getFullYear();
})();
