import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ClassicInput from '../../components/classic-input/classic-input.component';
import ClassicButton from '../../components/classic-button/classic-button.component';

import './sheet-creation-page.styles.scss';

import SheetCreationImage from '../../assets/bar_chart.svg';

import { createNewBudgetTracker } from '../../api/monthly-sheet.api';

const SheetCreationPage = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');

  const createBudgetTracker = async (title) => {
    const newId = await createNewBudgetTracker(title);

    setId(newId);
  };

  return (
    <div className="sheet-creation-page">
      <Container>
        <Row>
          <Col xs={12} md={5}>
            <h2>Create your budget tracker</h2>
            <p className="subtitle">And track your spending better</p>
            <h3>First, type your name</h3>
            <ClassicInput
              type="text"
              onChange={(event) => setTitle(event.target.value)}
            />
            <h3>Then, click here</h3>
            <ClassicButton onClick={() => createBudgetTracker(title)}>
              Create
            </ClassicButton>
            {id ? (
              <div className="result">
                <p>
                  This is the link to access your budget tracker. Don't forget
                  to bookmark it !
                </p>
                <Link to={`/${id}`}>Here's your link</Link>
              </div>
            ) : (
              ''
            )}
          </Col>
          <Col xs={12} md={7} className="col-img">
            <img
              src={SheetCreationImage}
              alt="Get help with your budget"
              className="create-tracker"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SheetCreationPage;
