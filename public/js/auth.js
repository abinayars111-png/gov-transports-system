async function register() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const name = nameEl ? nameEl.value.trim() : "";
  const email = emailEl ? emailEl.value.trim() : "";
  const password = passwordEl ? passwordEl.value : "";

  if (!name || !email || !password) {
    alert("Please enter name, email and password.");
    return;
  }

  // Name validation: letters and spaces only
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    alert("Name should only contain letters.");
    return;
  }

  // Email validation: basic email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Password validation: strictly greater than 6 characters
  if (password.length <= 6) {
    alert("Password must be more than 6 characters.");
    return;
  }

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    alert(data.message || "Registration failed. Try again.");
    return;
  }
  alert("Account created! You can now login with your email and password.");
  window.location = "login.html";
}

async function login() {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  window.location = "dashboard.html";
}
