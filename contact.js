/* contact.js — appointment / enquiry form: sends details to WhatsApp or email.
   Loaded after script.js; it takes over the form's submit so nothing needs a server. */
(function () {
  var PHONE = '923308119320';
  var EMAIL = 'khubibabrar1@gmail.com';
  var form = document.getElementById('contactForm');
  if (!form) return;

  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
  function setErr(id, msg) {
    var span = form.querySelector('[data-error-for="' + id + '"]');
    var field = document.getElementById(id).closest('.field');
    if (span) span.textContent = msg || '';
    if (field) field.classList.toggle('has-error', !!msg);
  }

  function validate() {
    var ok = true;
    var name = val('fName'), phone = val('fPhone'), email = val('fEmail'), msg = val('fMessage');
    setErr('fName', name ? '' : 'Please enter your name.'); if (!name) ok = false;
    var digits = phone.replace(/\D/g, '');
    setErr('fPhone', digits.length >= 10 ? '' : 'Please enter a valid phone number.'); if (digits.length < 10) ok = false;
    var badEmail = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErr('fEmail', badEmail ? 'Please enter a valid email address.' : ''); if (badEmail) ok = false;
    setErr('fMessage', msg ? '' : 'Please tell us what you need.'); if (!msg) ok = false;
    return ok;
  }

  function buildMessage() {
    var sel = document.getElementById('fInterest');
    var lines = ['Hello Net Trading & Marketing,',
      'Name: ' + val('fName')];
    if (val('fCompany')) lines.push('Company: ' + val('fCompany'));
    lines.push('Phone: ' + val('fPhone'));
    if (val('fEmail')) lines.push('Email: ' + val('fEmail'));
    if (sel) lines.push('Interested in: ' + sel.options[sel.selectedIndex].text);
    if (val('fDate')) lines.push('Preferred date: ' + val('fDate'));
    if (val('fTime')) lines.push('Preferred time: ' + val('fTime'));
    lines.push('Details: ' + val('fMessage'));
    return lines.join('\n');
  }

  function done() {
    var ok = document.getElementById('formSuccess');
    if (ok) ok.hidden = false;
  }

  // Capture on document so we run before any other submit handler on the form.
  document.addEventListener('submit', function (e) {
    if (e.target !== form) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (!validate()) return;
    window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent(buildMessage()), '_blank', 'noopener');
    done();
  }, true);

  var mailBtn = document.getElementById('sendEmail');
  if (mailBtn) mailBtn.addEventListener('click', function () {
    if (!validate()) return;
    var subject = 'Appointment / enquiry from ' + val('fName');
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(buildMessage());
    done();
  });
})();
