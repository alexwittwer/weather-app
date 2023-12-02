export default function validate(element) {
  const pattern = /^[a-zA-Z ,]*$/;
  if (element.value.trim() === "") {
    element.setCustomValidity("A location is required");
  } else if (!pattern.test(element.value)) {
    element.setCustomValidity(
      "Do not include any numbers or special characters"
    );
  } else {
    element.setCustomValidity("");
  }

  element.reportValidity();

  return element.checkValidity();
}
