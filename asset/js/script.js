/* ============================================================
   COUNTDOWN
============================================================ */
simplyCountdown(".simply-countdown", {
  year: 2025,
  month: 12,
  day: 14,
  hours: 0,
  minutes: 0,
  seconds: 0,
  words: {
    days: {
      // Function to handle pluralization
      lambda: (root, count) => (count > 1 ? root + "s" : root),
      root: "day", // Base word for days
    },
    hours: {
      lambda: (root, count) => (count > 1 ? root + "s" : root),
      root: "hour",
    },
    minutes: {
      lambda: (root, count) => (count > 1 ? root + "s" : root),
      root: "minute",
    },
    seconds: {
      lambda: (root, count) => (count > 1 ? root + "s" : root),
      root: "second",
    },
  },
});

// allert
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;

  toast.className = "toast show " + type;

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 2000);
}

/* ============================================================
   MUSIC CONTROL
============================================================ */
const music = document.querySelector(".music");
const musicButton = document.getElementById("music-button");
let isPlaying = false;

function toggleMusic(e) {
  e.preventDefault();
  if (isPlaying) {
    music.pause();
    musicButton.classList.remove("rotate");
  } else {
    music.play();
    musicButton.classList.add("rotate");
  }
  isPlaying = !isPlaying;
}
musicButton.addEventListener("click", toggleMusic);

// Pause ketika keluar tab
document.addEventListener("visibilitychange", () => {
  if (document.hidden && isPlaying) {
    music.pause();
  } else if (!document.hidden && isPlaying) {
    music.play();
  }
});

// Stop saat tab ditutup
window.addEventListener("beforeunload", () => {
  music.pause();
  music.currentTime = 0;
});

// Simpan posisi lagu
music.addEventListener("timeupdate", () => {
  localStorage.setItem("musicPosition", music.currentTime);
});

// Lanjutkan dari posisi sebelumnya
window.addEventListener("load", () => {
  const lastPos = localStorage.getItem("musicPosition");
  if (lastPos !== null) music.currentTime = parseFloat(lastPos);
});

/* ============================================================
   ANIMASI SEKUENSIAL (FADE-IN)
============================================================ */
function animateSequential(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const elements = [
    ".anim-seq-1",
    ".anim-seq-2",
    ".anim-seq-3",
    ".anim-seq-4",
    ".anim-seq-5",
    ".anim-seq-6",
    ".anim-seq-7",
  ]
    .map((cls) => container.querySelector(cls))
    .filter((el) => el != null);

  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, i * 300);
  });
}

/* ============================================================
   ANIMASI SAAT SCROLL
============================================================ */
const scrollAnimElements = document.querySelectorAll(".anim-scroll");

function checkScrollAnimation() {
  const trigger = window.innerHeight * 0.75;

  scrollAnimElements.forEach((el) => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("show");
    }
  });
}

/* ============================================================
   OPEN INVITATION
============================================================ */
document.getElementById("open-invitation").addEventListener("click", (e) => {
  e.preventDefault();

  const hero = document.getElementById("hero");
  const content = document.getElementById("content-section");

  hero.classList.add("fade-out");

  if (!isPlaying) {
    music.play();
    isPlaying = true;
    musicButton.classList.add("rotate");
  }

  setTimeout(() => {
    content.style.display = "block";
    animateSequential("pembuka-section");
    hero.remove();
    document.body.style.overflowY = "auto";
    checkScrollAnimation();
  }, 800);
});

/* ============================================================
   INIT
============================================================ */
window.addEventListener("DOMContentLoaded", () => {
  animateSequential("hero");
});
window.addEventListener("scroll", checkScrollAnimation);
window.addEventListener("resize", checkScrollAnimation);

/* ============================================================
   E-AMPLOP TOGGLE
============================================================ */
const btnAmplop = document.getElementById("btnAmplop");
const giftContent = document.getElementById("giftContent");

btnAmplop.addEventListener("click", () => {
  const hidden = giftContent.classList.contains("hide");

  if (hidden) {
    giftContent.classList.remove("hide");
    giftContent.classList.add("show");
    btnAmplop.textContent = "TUTUP AMPLOP";
  } else {
    giftContent.classList.remove("show");
    giftContent.classList.add("hide");
    btnAmplop.textContent = "E-AMPLOP";
  }
});

/* ============================================================
   SAVE DATE .ICS DOWNLOAD
============================================================ */
document.getElementById("btnSaveDate").addEventListener("click", () => {
  const event = {
    title: "Pernikahan Toni & Eka",
    start: "20251214T080000",
    end: "20251214T140000",
  };

  const url =
    "data:text/calendar;charset=utf-8," +
    encodeURIComponent(
      `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${event.start}
DTEND:${event.end}
END:VEVENT
END:VCALENDAR`
    );

  const a = document.createElement("a");
  a.href = url;
  a.download = "SaveTheDate.ics";
  a.click();
});

/* ============================================================
   LIGHTBOX GALLERY
============================================================ */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".img-gallery").forEach((img) => {
  img.addEventListener("click", function () {
    lightboxImg.src = this.src;
    lightbox.classList.add("show");
  });
});
lightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

/* ============================================================
   COPY TO CLIPBOARD
============================================================ */
function copyById(idName) {
  const text = document.getElementById(idName).innerText;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Disalin ✓");
  });
}

/* ============================================================
   SLIDESHOW BACKGROUND (FINAL & FIXED)
============================================================ */
window.addEventListener("DOMContentLoaded", function () {
  const momentPhotos = Array.from(
    document.querySelectorAll(".moment-photo")
  ).map((img) => img.src);

  const screens = document.querySelectorAll(".screen2");

  if (momentPhotos.length === 0 || screens.length === 0) {
    return;
  }

  let currentSlide = 0;

  function changeBackground() {
    currentSlide = (currentSlide + 1) % momentPhotos.length;

    screens.forEach((section) => {
      section.style.transition = "background-image 1s ease-in-out";
      section.style.backgroundImage = `url('${momentPhotos[currentSlide]}')`;
    });
  }

  setInterval(changeBackground, 4000);
});

/* =======================
   AUTO NAMA UNDANGAN
======================= */
function getInviteName() {
  const params = new URLSearchParams(window.location.search);
  const to = params.get("to");
  if (!to) return null;
  return decodeURIComponent(to)
    .replace(/\+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function applyInviteName() {
  const inviteName = getInviteName();
  if (!inviteName) return;

  const target = document.getElementById("guestName");
  if (target) target.textContent = inviteName;

  const rsvpName = document.getElementById("rsvpNameInput");
  if (rsvpName) {
    rsvpName.value = inviteName;
    rsvpName.readOnly = true;
  }
}
applyInviteName();

/* =======================
   TIME AGO HELPER
======================= */
function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  if (seconds < 60) return "Just now";
  if (minutes < 60) return Math.floor(minutes) + " minutes ago";
  if (hours < 24) return Math.floor(hours) + " hours ago";
  if (days < 7) return Math.floor(days) + " days ago";
  if (weeks < 4) return Math.floor(weeks) + " weeks ago";
  if (months < 12) return Math.floor(months) + " months ago";
  return Math.floor(years) + " years ago";
}

/* =======================
   SAVE COMMENT / RSVP
======================= */
async function setupSaveComment() {
  const form = document.getElementById("rsvpForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("rsvpNameInput").value.trim();
    const status = document.getElementById("attendanceSelect").value;
    const message = document.getElementById("wishMessage").value.trim();
    if (!name || !status || !message)
      return showToast("Silahkan Tulis Doa&Harapan!.");

    try {
      await window.pushDB("wishes", {
        name,
        status,
        message,
        time: Date.now(),
      });

      form.reset();
      applyInviteName();
      showToast("Doa&Harapan Berhasil Dikirim.");
    } catch (err) {
      showToast("Terjadi kesalahan saat mengirim Doa&Harapan.");
    }
  });
}

/* =======================
   LOAD COMMENTS (REALTIME)
======================= */
function setupLoadComments() {
  window.onValueDB("wishes", (snapshot) => {
    const data = snapshot.val() || {};
    const arr = Object.values(data);
    window.currentList = arr.map((item) => ({
      ...item,
      timeText: timeAgo(item.time),
    }));
    renderComments(window.currentList);
  });
}

/* =======================
   RENDER COMMENTS + PAGINATION
======================= */
function renderComments(list) {
  const container = document.getElementById("guestbookList");
  const perPage = 5;
  let page = window.currentPage || 1;

  const totalPages = Math.ceil(list.length / perPage);
  if (page > totalPages) page = totalPages || 1;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const current = list.slice().reverse().slice(start, end);

  // Hapus komentar lama, tapi JANGAN hapus paginationContainer
  container.querySelectorAll(".wish-item").forEach((el) => el.remove());

  current.forEach((item) => {
    const icon =
      item.status === "Hadir"
        ? `<i class="bi bi-check-circle-fill text-primary"></i>`
        : `<i class="bi bi-x-circle-fill text-danger"></i>`;

    container.innerHTML += `
      <div class="wish-item">
        <b>${item.name} ${icon}</b>
        <small class="text-muted"> • ${item.timeText}</small>
        <div>${item.message}</div>
        <hr>
      </div>
    `;
  });

  renderPagination(totalPages, page);
}

function renderPagination(total, current) {
  const container = document.getElementById("paginationContainer");
  if (!container) return;
  container.innerHTML = "";

  if (total <= 1) return;

  const maxVisible = 5;
  let startPage = Math.max(current - Math.floor(maxVisible / 2), 1);
  let endPage = startPage + maxVisible - 1;

  if (endPage > total) {
    endPage = total;
    startPage = Math.max(endPage - maxVisible + 1, 1);
  }

  if (startPage > 1) {
    const prev = document.createElement("button");
    prev.textContent = "<";
    prev.className = "btn btn-sm mx-1 btn-outline-primary";
    prev.onclick = () => {
      window.currentPage = startPage - 1;
      renderComments(window.currentList);
    };
    container.appendChild(prev);
  }

  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className =
      "btn btn-sm mx-1 " +
      (i === current ? "btn-primary" : "btn-outline-primary");
    btn.onclick = () => {
      window.currentPage = i;
      renderComments(window.currentList);
    };
    container.appendChild(btn);
  }

  if (endPage < total) {
    const next = document.createElement("button");
    next.textContent = ">";
    next.className = "btn btn-sm mx-1 btn-outline-primary";
    next.onclick = () => {
      window.currentPage = endPage + 1;
      renderComments(window.currentList);
    };
    container.appendChild(next);
  }
}

/* =======================
   INIT
======================= */
setupSaveComment();
setupLoadComments();
