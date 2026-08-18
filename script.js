// Personality tab switcher
const TONE_EXAMPLES = {
  brutal: "Third time this week you skipped it. That's not busy, that's avoiding it.",
  coach: "You're a little behind pace. Twenty minutes tonight gets you back on track.",
  friend: "Rough day, huh. Let's just pick this back up tomorrow, no big deal.",
  assistant: "Weekly goal completion is at 33 percent. Want me to move today's session to 7pm?",
};

const toneTabs = document.querySelectorAll(".tone-tab");
const toneExample = document.getElementById("toneExample");

toneTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    toneTabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    const tone = tab.getAttribute("data-tone");
    toneExample.textContent = TONE_EXAMPLES[tone];
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Waitlist form — submits to Formspree via fetch so the visitor stays on the page.
const form = document.getElementById("waitlistForm");
const status = document.getElementById("formStatus");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    status.textContent = "Sending...";
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        status.textContent = "You're on the list. We'll be in touch.";
        form.reset();
      } else {
        status.textContent = "Something went wrong — try again in a moment.";
      }
    } catch {
      status.textContent = "Something went wrong — try again in a moment.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}
