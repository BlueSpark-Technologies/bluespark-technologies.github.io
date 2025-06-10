import PageBanner from "@/src/components/PageBanner";
import Layouts from "@/src/layouts/Layouts";
import { Formik } from "formik";
import { useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Head from "next/head";
import AppData from "@data/app.json";

import ArrowIcon from "@layouts/svg-icons/Arrow";

const Contact = () => {
  const recaptchaRef = useRef(null);

  return (
    <>
      <Head>
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        />
      </Head>
      <Layouts hideFooterButton>
        <PageBanner
          pageTitle={"Get in touch!"}
          breadTitle={"Contact"}
          anchorLabel={"Send message"}
          anchorLink={"#contact"}
          paddingBottom={1}
          align={"center"}
        />

        {/* map */}
        {/* <div className="mil-map-frame mil-up">
          <div className="mil-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2733.154156073748!2d23.6017701!3d46.761857799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490c3195683c67%3A0xb9695b41d046622d!2sStrada%20Nicolae%20Iorga%2023%2C%20Cluj-Napoca%20400638!5e0!3m2!1sen!2sro!4v1744641647923!5m2!1sen!2sro"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div> */}
        {/* map end */}

        {/* contact form */}
        <section id="contact">
          <div className="contact-info mil-mb-60">
            <a
              aria-label="Call us at ‭+40 749 424180‬"
              href="tel:%E2%80%AD+40 749 424180%E2%80%AC"
            >
              <img src="/img/icons/phone.svg" alt="phone-icon" />
              <span className="mil-blue-soft mil-text-xl">‭+40 749 424180‬</span>
            </a>
            <a
              aria-label="Email us at hello@bluespark.ro"
              href="mailto:hello@bluespark.ro"
            >
              <img src="/img/icons/mail.svg" alt="mail-icon" />
              <span className="mil-blue-soft mil-text-xl">hello@bluespark.ro</span>
            </a>
          </div>
          <div className="container mil-p-120-90">
            <h3 className="mil-center mil-up mil-mb-120">
              Let's <span className="mil-thin">Talk</span>
            </h3>

            <Formik
              initialValues={{ email: "", name: "", message: "", recaptcha: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.name) {
                  errors.name = "Required";
                }
                if (!values.message) {
                  errors.message = "Required";
                }
                if (!values.recaptcha) {
                  errors.recaptcha = "Please complete the CAPTCHA verification";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm, setFieldValue }) => {
                const status = document.getElementById("contactFormStatus");
                
                try {
                  setSubmitting(true);
                  status.innerHTML = '<span style="color: #007bff;">Sending your message...</span>';
                  
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: values.name,
                      email: values.email,
                      message: values.message,
                      recaptchaToken: values.recaptcha,
                    }),
                  });

                  const data = await response.json();

                  if (response.ok && data.success) {
                    status.innerHTML = `<span style="color: #28a745;">${data.message}</span>`;
                    resetForm();
                    // Reset reCAPTCHA
                    if (recaptchaRef.current) {
                      recaptchaRef.current.reset();
                    }
                  } else {
                    if (data.errors && Array.isArray(data.errors)) {
                      status.innerHTML = `<span style="color: #dc3545;">${data.errors.join(', ')}</span>`;
                    } else {
                      status.innerHTML = `<span style="color: #dc3545;">${data.message || 'Something went wrong. Please try again.'}</span>`;
                    }
                    // Reset reCAPTCHA on error
                    if (recaptchaRef.current) {
                      recaptchaRef.current.reset();
                    }
                    setFieldValue('recaptcha', '');
                  }
                } catch (error) {
                  console.error('Form submission error:', error);
                  status.innerHTML = '<span style="color: #dc3545;">Network error. Please check your connection and try again.</span>';
                  // Reset reCAPTCHA on error
                  if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                  }
                  setFieldValue('recaptcha', '');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                isValid,
                dirty
              }) => (
                <form
                  onSubmit={handleSubmit}
                  id="contactForm"
                  className="row align-items-center"
                >
                  <div className="col-lg-6 mil-up">
                    <input
                      type="text"
                      placeholder="What's your name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '-20px', marginBottom: '20px' }}>
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6 mil-up">
                    <input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '-20px', marginBottom: '20px' }}>
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 mil-up">
                    <textarea
                      placeholder="Message"
                      name="message"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.message}
                    />
                    {errors.message && touched.message && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '-20px', marginBottom: '20px' }}>
                        {errors.message}
                      </div>
                    )}
                  </div>
                  
                  {/* reCAPTCHA */}
                  <div className="col-lg-12 mil-up" style={{ marginBottom: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={(value) => setFieldValue('recaptcha', value)}
                        onExpired={() => setFieldValue('recaptcha', '')}
                        onError={() => setFieldValue('recaptcha', '')}
                      />
                    </div>
                    {errors.recaptcha && touched.recaptcha && (
                      <div style={{ color: '#dc3545', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
                        {errors.recaptcha}
                      </div>
                    )}
                  </div>

                  <div className="col-lg-8">
                    <p className="mil-up mil-mb-30">
                      <span className="mil-accent">*</span> We promise not to
                      disclose your personal information to third parties.
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <div className="mil-adaptive-right mil-up mil-mb-30">
                      <button
                        type="submit"
                        className="mil-button mil-button-dark mil-arrow-place"
                        disabled={isSubmitting}
                        style={{ 
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          opacity: isSubmitting ? 0.7 : 1,
                          pointerEvents: "auto"
                        }}
                      >
                        <span>{isSubmitting ? 'Sending...' : 'Send message'}</span>
                        <ArrowIcon />
                      </button>
                    </div>
                  </div>
                  <div className="form-status" id="contactFormStatus" />
                </form>
              )}
            </Formik>
          </div>
        </section>
        {/* contact form end */}
      </Layouts>
    </>
  );
};
export default Contact;
