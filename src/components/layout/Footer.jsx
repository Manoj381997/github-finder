import React from 'react';
import { FaGithub } from 'react-icons/fa';

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer className='footer p-10 bg-gray-700 text-primary-content footer-center'>
      <div>
        <a
          href='https://github.com/Manoj381997'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithub className='inline text-5xl' />
        </a>
        <p>
          Copyright &copy; 2023-{footerYear} by{' '}
          <a
            href='https://www.linkedin.com/in/manojg381997'
            target='_blank'
            rel='noopener noreferrer'
          >
            Manoj Kumar G
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
