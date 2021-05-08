import React from 'react';

import Container from 'react-bootstrap/Container';

import './resources-page.styles.scss';

const ResourcesPage = () => {
  return (
    <div className="resources-page">
      <Container>
        <h1>Resources and tips</h1>
        <h2>How to use this website ?</h2>
        <ul>
          <li>Create your budget tracker</li>
          <li className="special-li">Set the URL as a bookmark !</li>
          <li>
            Go to the URL, and type in your information about your CURRENT
            situation for the 1st step
          </li>
          <li>
            For the 2nd step, enter your spending categories, with the amount
            you want to spend each month
          </li>
          <li>
            <span className="special-li">STICK WITH IT</span>
          </li>
          <li>Click the Finish! button, and go to your monthly sheets page</li>
          <li>
            Every month, add a new sheet with your information for this month
          </li>
        </ul>
        <h2>Where can I get tips for managing my personal finances ?</h2>
        <p>
          There are tons of resources online, on YouTube and Reddit for example.
          Here's a list of YouTube channels or subreddits that can help you :
        </p>
        <ul>
          <li>
            <a
              href="https://www.reddit.com/r/UKPersonalFinance/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reddit's UK Personal Finance subreddit
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/vosfinances/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reddit's French personal finance subreddit
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/Frugal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reddit's Frugal Subreddit
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/EatCheapAndHealthy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reddit's Eat Cheap and Healthy
            </a>
          </li>
          <li>
            <a
              href="https://www.amazon.co.uk/Meaningful-Money-Handbook-Everything-everything/dp/0857196510"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Meaningful Money Handbook - Where the idea for this website
              came from, lots of good tips in that book !
            </a>
          </li>
        </ul>
        <h2>How to contact me ?</h2>
        <p>
          You can send me an email
          <a href="mailto:quidwatchers@gmail.com"> quidwatchers@gmail.com</a>
        </p>
      </Container>
    </div>
  );
};

export default ResourcesPage;
