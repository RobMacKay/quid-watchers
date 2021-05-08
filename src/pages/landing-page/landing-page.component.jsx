import React from 'react';

import LandingImage from './../../assets/landing.svg';
import Account from '../../assets/account.svg';
import Privacy from '../../assets/privacy.svg';
import Quick from '../../assets/quick.svg';

import './landing-page.styles.scss';
import { Button, Jumbotron } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import ClassicButton from '../../components/classic-button/classic-button.component';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="slice py-7">
        <div className="container">
          <div className="row row-grid align-items-center">
            <div className="col-12 col-md-5 col-lg-6 order-md-2 text-center">
              <figure className="w-100">
                <img
                  alt="Image placeholder"
                  src={LandingImage}
                  className="img-fluid mw-md-120"
                />
              </figure>
            </div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
              <h1 className="display-4 text-center text-md-left mb-3">
                It's time to save
                <strong className="text-primary"> money</strong>
              </h1>
              <p className="lead text-center text-md-left text-muted">
                Create a budget tracker, enter your details about your income
                and savings, and keep track of your budget
              </p>
              <div className="text-center text-md-left mt-5">
                <ClassicButton>
                  <Link to={'/create-budget-tracker'}>Get started</Link>
                </ClassicButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="slice slice-lg pt-lg-6 pb-0 pb-lg-6 bg-section-secondary">
        <div className="container">
          <div className="row mb-5 justify-content-center text-center">
            <div className="col-lg-6">
              <h2 className=" mt-4">Why should you use Quid Watchers ?</h2>
              <div className="mt-2">
                <p className="lead lh-180">
                  Use Quid Watchers to track your budget over the months and
                  visually see where your money is going
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body pb-5">
                  <div className="pt-4 pb-5">
                    <img
                      src={Account}
                      className="img-fluid img-center"
                      style={{ height: '150px' }}
                      alt="Illustration"
                    />
                  </div>
                  <h5 className="h4 lh-130 mb-3">No account needed</h5>
                  <p className="text-muted mb-0">
                    Just create a budget tracker, and you'll get a random URL,
                    set it to your bookmarks and access it at anytime !
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body pb-5">
                  <div className="pt-4 pb-5">
                    <img
                      src={Privacy}
                      className="img-fluid img-center"
                      style={{ height: '150px' }}
                      alt="Illustration"
                    />
                  </div>
                  <h5 className="h4 lh-130 mb-3">Your Privacy is Protected</h5>
                  <p className="text-muted mb-0">
                    Quid Watchers doesn't collect any data apart from what
                    you're typing. The data won't be sold to any company.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body pb-5">
                  <div className="pt-4 pb-5">
                    <img
                      src={Quick}
                      className="img-fluid img-center"
                      style={{ height: '150px' }}
                      alt="Illustration"
                    />
                  </div>
                  <h5 className="h4 lh-130 mb-3">Quick to Use</h5>
                  <p className="text-muted mb-0">
                    1 click to start your budget tracker, 1 click to access it,
                    1 click to save money, go ahead !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="banner">
        <Jumbotron fluid>
          <Container>
            <h1>Start saving money now</h1>
            <ClassicButton>
              <Link to={'/create-budget-tracker'}>Create a budget tracker</Link>
            </ClassicButton>
          </Container>
        </Jumbotron>
      </section>
    </div>
  );
};

export default LandingPage;
