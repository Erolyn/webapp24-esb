import React, {
  FormEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

export type ContactProps = {
  email: string;
  onContactFormSubmitted: (formData: {
    event: FormEvent<HTMLFormElement>;
  }) => void;
};

export default function Contact(
  props: Readonly<PropsWithChildren<ContactProps>>
) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submittedMessages, setSubmittedMessages] = useState<
    { name: string; email: string; message: string }[]
  >([]);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  // Load previously submitted messages from local storage
  useEffect(() => {
    const storedMessages = localStorage.getItem("submittedMessages");
    if (storedMessages) {
      setSubmittedMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save submitted messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "submittedMessages",
      JSON.stringify(submittedMessages)
    );
  }, [submittedMessages]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let valid = true;
    let errors = { name: "", email: "", message: "" };

    if (!formData.name) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!formData.email) {
      errors.email = "Email is required";
      valid = false;
    }
    if (!formData.message) {
      errors.message = "Message is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      const newMessage = { ...formData };
      const updatedMessages = [newMessage, ...submittedMessages];

      // Keep only the last five messages
      const latestMessages = updatedMessages.slice(0, 5);
      setSubmittedMessages(latestMessages);
      props.onContactFormSubmitted({ event: e });
      handleReset(); // Reset the form after submission
    }
  };

  // Reset form data and submitted messages
  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
    setSubmittedMessages([]); // Clear submitted messages
  };

  return (
    <div id="contact-form-container">
      <form id="contact-form" onSubmit={handleSubmit}>
        <h3>Contact Us</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>

      {/* Display submitted messages */}
      {submittedMessages.length > 0 && (
        <div>
          <h3>Submitted Messages:</h3>
          <pre>{JSON.stringify(submittedMessages, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
