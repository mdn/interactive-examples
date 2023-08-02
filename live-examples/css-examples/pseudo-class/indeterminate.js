const newsletter = document.getElementById('newsletter');
const premium = document.getElementById('premium');

premium.indeterminate = true;

newsletter.addEventListener('change', function () {
  if (this.checked) {
    premium.disabled = false;
    premium.indeterminate = false;
  } else {
    premium.checked = false;
    premium.disabled = true;
    premium.indeterminate = true;
  }
});
