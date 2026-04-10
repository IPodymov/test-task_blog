import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - MetaBlog',
  description: 'Get in touch with the MetaBlog team',
};

export default function ContactPage() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.infoCard}>
            <h3>Address</h3>
            <p>1328 Oak Ridge Drive, Saint Louis, Missouri</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Contact Info</h3>
            <p>
              313-332-8662<br />
              info@jstemplate.net
            </p>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h2>Leave a Message</h2>
          <form className={styles.form}>
            <div className={styles.row}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Write a message" rows={5} required></textarea>
            <button type="button" className={styles.button}>Send Message</button>
          </form>
        </div>
      </div>
    </main>
  );
}