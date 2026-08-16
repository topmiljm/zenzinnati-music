import { useState, useEffect, useRef } from 'react';

const API_URL = 'https://zenzinnati-music.onrender.com';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  // idle | loading | slow | success | error
  const [status, setStatus] = useState('idle');
  const slowTimerRef = useRef(null);

  // Pre-warm the server as soon as the page loads
  useEffect(() => {
    fetch(`${API_URL}/api/health`).catch(() => { });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');

    // If it's still going after 4s, assume cold start and update the message
    slowTimerRef.current = setTimeout(() => setStatus('slow'), 4000);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: '',
        });
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        console.error(data);
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      clearTimeout(slowTimerRef.current);
    }
  }

  const isSubmitting = status === 'loading' || status === 'slow';

  function getButtonText() {
    switch (status) {
      case 'loading':
        return 'Sending...';
      case 'slow':
        return 'Waking up the server, hang tight...';
      case 'success':
        return 'Sent! ✓';
      case 'error':
        return 'Failed — try again';
      default:
        return 'Submit';
    }
  }

  return (
    <>
      <div className="contact-page">
        <h1 className="contact-title">Contact</h1>
        <div className="contact-container">

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <p>* required field</p>
              <div className="name-row">
                <div className="field-group">
                  <span>First Name *</span>
                  <input type="text" maxLength={50} required value={formData.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstName: e.target.value,
                      })
                    } />
                </div>

                <div className="field-group">
                  <span>Last Name</span>
                  <input type="text" maxLength={50} value={formData.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastName: e.target.value,
                      })
                    } />
                </div>
              </div>
            </div>

            <div className="field-group">
              <span>Email *</span>
              <input type="email" maxLength={50} required value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                } />
            </div>

            <div className="field-group">
              <span>Subject *</span>
              <input type="text" maxLength={125} required value={formData.subject}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject: e.target.value,
                  })
                } />
            </div>

            <div className="field-group">
              <span>Message *</span>
              <textarea rows="6" maxLength={500} required value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                } />
            </div>

            <button type="submit" className="contact-submit" disabled={isSubmitting}>
              {isSubmitting && <span className="btn-spinner" />}
              {getButtonText()}
            </button>

            {status === 'slow' && (
              <p className="submit-note">
                Our server sleeps when idle to save costs — first request after a
                while can take up to 30 seconds. Thanks for your patience!
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}