function sendMail() {
    const params = {
      from_name: document.getElementById("name").value,
      reply_to: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };
  
    emailjs.send("service_7rph7np", "template_1cvg3gl", params)
      .then(response => {
        alert("Email sent successfully!");
        document.getElementById("contactForm").reset();
      })
      .catch(error => {
        alert("Failed to send email.");
        console.error("EmailJS Error:", error);
      });
  }
  
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    sendMail();
  });
  