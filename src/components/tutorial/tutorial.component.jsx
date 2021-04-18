import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import './tutorial.styles.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ClassicInput from '../classic-input/classic-input.component';
import ClassicButton from '../classic-button/classic-button.component';

import McGregorShowOff from '../../assets/mcgregor.svg';

import { createNewMonthlySheet } from '../../firebase/firebase.utils';

import { setHasTutoed } from '../../api/monthly-sheet.api';

const Tutorial = () => {
  const { id } = useParams();

  const [accountInformation, setAccountInformation] = useState({
    netIncome: '',
    overspentLastMonth: '',
    netMinusOverspent: '',
    totalDistributed: '',
    debts: {},
    savings: {},
    categories: {},
  });
  const [nbDebtsAndSavings, setNbDebtsAndSavings] = useState({
    nbDebts: 3,
    nbSavings: 3,
    nbCategories: 3,
  });
  const [currentStep, setCurrentStep] = useState(1);

  const findTotal = () => {
    const inputs = document.getElementsByName('categories-amount');
    let tot = 0;
    for (let i = 0; i < inputs.length; i++) {
      if (parseInt(inputs[i].value)) {
        tot += parseInt(inputs[i].value);
      }
    }

    return tot;
  };

  const handleChangeInformation = (event) => {
    const { name, value } = event.target;

    if (
      name === 'netIncome' ||
      name === 'overspentLastMonth' ||
      name === 'netMinusOverspent'
    ) {
      setAccountInformation({
        ...accountInformation,
        [name]: value,
      });
    } else {
      const dataType = event.target.dataset.type;

      if (dataType === 'debts') {
        setAccountInformation({
          ...accountInformation,
          debts: {
            ...accountInformation.debts,
            [name]: value,
          },
        });
      } else if (dataType === 'savings') {
        setAccountInformation({
          ...accountInformation,
          savings: {
            ...accountInformation.savings,
            [name]: value,
          },
        });
      } else if (dataType === 'categories-amount') {
        const total = findTotal();

        setAccountInformation({
          ...accountInformation,
          totalDistributed: total,
        });
      }
    }
  };

  const changeNbDebtSaving = (event) => {
    const elem = event.target;
    const elemType = elem.dataset.type;

    if (
      elemType === 'nbDebts' ||
      elemType === 'nbSavings' ||
      elemType === 'nbCategories'
    ) {
      if (elem.classList.contains('plus')) {
        setNbDebtsAndSavings({
          ...nbDebtsAndSavings,
          [elemType]: nbDebtsAndSavings[elemType] + 1,
        });
      } else if (elem.classList.contains('minus')) {
        setNbDebtsAndSavings({
          ...nbDebtsAndSavings,
          [elemType]: nbDebtsAndSavings[elemType] - 1,
        });
      }
    }
  };

  const buildTheCategories = async () => {
    const categories = document.querySelectorAll('.item-category');

    let categoriesObject = {};

    categories.forEach((category) => {
      // console.log(category);
      let categoryName = '';

      category.childNodes.forEach((child) => {
        const superChild = child.childNodes[0].childNodes[0];

        if (superChild.getAttribute('name') === 'categories-name') {
          categoryName = superChild.value;
        } else if (superChild.getAttribute('name') === 'categories-amount') {
          categoriesObject = {
            ...categoriesObject,
            [categoryName]: superChild.value,
          };
        }
      });
    });

    return categoriesObject;
  };

  const handleFinishTutorial = async () => {
    await setHasTutoed(id);

    const categories = await buildTheCategories();

    const infoToPassOn = {
      ...accountInformation,
      categories: categories,
    };

    createNewMonthlySheet(id, infoToPassOn);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const total =
    accountInformation.netIncome -
    accountInformation.overspentLastMonth -
    accountInformation.totalDistributed;

  // Quick thing : there could have been a few components created here to avoid code repetition, but I'm not sure it'd have been really THAT necessary, so I didn't

  return (
    <div className="tutorial">
      <Container>
        <div className="steps">
          <p className={`one ${currentStep >= 1 ? 'active' : ''}`}>Step 1</p>
          <p className={`two ${currentStep >= 2 ? 'active' : ''}`}>Step 2</p>
          <p className={`two ${currentStep >= 3 ? 'active' : ''}`}>Step 3</p>
        </div>
        <Row>
          <Col
            xs={12}
            md={6}
            className={`step-1 ${currentStep === 1 ? '' : 'd-none'}`}
          >
            <h2>Type in your information</h2>
            <p>
              That will help you have an overview of what resources you'll have
              this month
            </p>
            <table className="table-tutorial overview">
              <tbody>
                <tr>
                  <th className="left-col">Net Income</th>
                  <th className="right-col">
                    <ClassicInput
                      type="text"
                      name="netIncome"
                      id="netIncome"
                      onChange={handleChangeInformation}
                      value={accountInformation.netIncome}
                    />
                  </th>
                </tr>
                <tr>
                  <td className="left-col">Overspent last month</td>
                  <td className="right-col">
                    <ClassicInput
                      type="text"
                      name="overspentLastMonth"
                      id="overspentLastMonth"
                      onChange={handleChangeInformation}
                      value={accountInformation.overspentLastMonth}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="left-col">Net Income minus overspent</td>
                  <td className="right-col">
                    <ClassicInput
                      type="text"
                      name="netMinusOverspent"
                      id="netMinusOverspent"
                      onChange={handleChangeInformation}
                      value={
                        accountInformation.netIncome -
                        accountInformation.overspentLastMonth
                      }
                    />
                  </td>
                </tr>
                <tr className="separator">
                  <td className="left-col title">DEBTS</td>
                  <td className="right-col">
                    <div
                      className="debt-control plus"
                      data-type="nbDebts"
                      onClick={changeNbDebtSaving}
                    >
                      +
                    </div>
                    <div
                      className="debt-control minus"
                      data-type="nbDebts"
                      onClick={changeNbDebtSaving}
                    >
                      -
                    </div>
                  </td>
                </tr>
                {_.times(nbDebtsAndSavings.nbDebts, (i) => {
                  return (
                    <tr key={`debt-${i}`}>
                      <td className="left-col">Debt {i + 1}</td>
                      <td className="right-col">
                        <ClassicInput
                          type="text"
                          data-type="debts"
                          name={`debt-${i + 1}`}
                          id={`debt-${i + 1}`}
                          onChange={handleChangeInformation}
                          value={
                            accountInformation.debts[`debt-${i + 1}`]
                              ? accountInformation.debts[`debt-${i + 1}`]
                              : ''
                          }
                          key={i}
                        />
                      </td>
                    </tr>
                  );
                })}
                <tr className="separator">
                  <td className="left-col title">SAVINGS</td>
                  <td className="right-col">
                    <div
                      className="debt-control plus"
                      data-type="nbSavings"
                      onClick={changeNbDebtSaving}
                    >
                      +
                    </div>
                    <div
                      className="debt-control minus"
                      data-type="nbSavings"
                      onClick={changeNbDebtSaving}
                    >
                      -
                    </div>
                  </td>
                </tr>
                {_.times(nbDebtsAndSavings.nbSavings, (i) => {
                  return (
                    <tr key={`saving-${i}`}>
                      <td className="left-col">Savings {i + 1}</td>
                      <td className="right-col">
                        <ClassicInput
                          type="text"
                          data-type="savings"
                          name={`saving-${i + 1}`}
                          id={`saving-${i + 1}`}
                          onChange={handleChangeInformation}
                          value={
                            accountInformation.savings[`saving-${i + 1}`]
                              ? accountInformation.savings[`saving-${i + 1}`]
                              : ''
                          }
                          key={i}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <ClassicButton
              onClick={nextStep}
              className="classic-button next-button"
            >
              Next
            </ClassicButton>
          </Col>
          <Col
            xs={12}
            md={6}
            className={`step-2 ${currentStep === 2 ? '' : 'd-none'}`}
          >
            <h2>Distribute your money</h2>
            <p>To remember where you're supposed to spend your money</p>
            <table className="table-tutorial distribute">
              <tbody>
                <tr className="separator">
                  <td className="left-col title">
                    BUDGET CATEGORIES <br />
                    <span
                      className={`amount-left ${total < 0 ? 'warning' : ''}`}
                    >
                      Amount left: {total}
                    </span>
                  </td>
                  <td className="right-col">
                    <div
                      className="budget-control plus"
                      data-type="nbCategories"
                      onClick={changeNbDebtSaving}
                    >
                      +
                    </div>
                    <div
                      className="budget-control minus"
                      data-type="nbCategories"
                      onClick={changeNbDebtSaving}
                    >
                      -
                    </div>
                  </td>
                </tr>
                {_.times(nbDebtsAndSavings.nbCategories, (i) => {
                  return (
                    <tr className="item-category" key={`category-${i}`}>
                      <td className="left-col">
                        <ClassicInput
                          type="text"
                          placeholder="Name"
                          name={`categories-name`}
                          id={`categories-name-${i + 1}`}
                          onChange={handleChangeInformation}
                          key={i + 1}
                        />
                      </td>
                      <td className="right-col">
                        <ClassicInput
                          type="text"
                          placeholder="Amount"
                          data-type="categories-amount"
                          name="categories-amount"
                          id={`categories-${i + 1}`}
                          onChange={handleChangeInformation}
                          key={i + 1}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="button-group">
              <ClassicButton
                onClick={previousStep}
                className="classic-button previous-button"
              >
                Previous
              </ClassicButton>
              <ClassicButton
                onClick={nextStep}
                className="classic-button next-button"
              >
                Next
              </ClassicButton>
            </div>
          </Col>
          <Col
            xs={12}
            md={6}
            className={`step-3 ${currentStep === 3 ? '' : 'd-none'}`}
          >
            <h2>You're all set !</h2>
            <p>
              Click on the "Finish !" button, keep this URL, refresh the page
              and create new monthly sheets at the beginning of every month !
            </p>

            <div className="button-group">
              <ClassicButton
                onClick={previousStep}
                className="classic-button previous-button"
              >
                Previous
              </ClassicButton>
              <ClassicButton
                onClick={handleFinishTutorial}
                className="classic-button finish-button"
              >
                Finish !
              </ClassicButton>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <img
              src={McGregorShowOff}
              alt="Learn how to budget"
              className="mcgregor"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tutorial;
