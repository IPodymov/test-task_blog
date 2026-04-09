import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.about}>
            <h3>About</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            <p className={styles.contact}>
              <strong>Email :</strong> info@jstemplate.net<br />
              <strong>Phone :</strong> 880 123 456 789
            </p>
          </div>
          <div className={styles.links}>
            <h3>Quick Link</h3>
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Blog</Link>
            <Link href="/">Archived</Link>
            <Link href="/">Author</Link>
            <Link href="/">Contact</Link>
          </div>
          <div className={styles.links}>
            <h3>Category</h3>
            <Link href="/">Lifestyle</Link>
            <Link href="/">Technology</Link>
            <Link href="/">Travel</Link>
            <Link href="/">Business</Link>
            <Link href="/">Economy</Link>
            <Link href="/">Sports</Link>
          </div>
          <div className={styles.newsletter}>
            <div className={styles.newsletterBox}>
              <h3>Weekly Newsletter</h3>
              <p>Get blog articles and offers via email</p>
              <div className={styles.form}>
                <input type="email" placeholder="Your Email" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.logo}>
             <span className={styles.logomark}>M</span>
            <span>Meta<strong>Blog</strong></span>
            <span className={styles.copyright}>© JS Template 2023. All Rights Reserved.</span>
          </div>
          <div className={styles.legal}>
            <Link href="/">Terms of Use</Link>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}