import React, { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { dateFormat } from '../../utilities/dateFormat';
import _ from 'lodash';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ClassicInput from '../../components/classic-input/classic-input.component';
import ClassicButton from '../../components/classic-button/classic-button.component';

import './new-sheet.styles.scss';

import { createNewMonthlySheet } from '../../api/monthly-sheet.api';
import { Alert } from 'react-bootstrap';

const NewSheet = () => {
  const { id } = useParams();
  const { history } = useHistory();
  const [messageAlert, setMessageAlert] = useState({});

  const [cantAddSheet, setCantAddSheet] = useState('');

  const [accountInformation, setAccountInformation] = useState({
    month: '',
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

  const findTotalCategories = () => {
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
    } else if (name === 'month') {
      const date = new Date(value);

      const formattedDate = dateFormat(date, 'mmmm yyyy');

      setAccountInformation({
        ...accountInformation,
        [name]: formattedDate,
      });
    } else {
      const dataType = event.target.dataset.type;

      if (dataType === 'debts-amount') {
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
        const total = findTotalCategories();

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

  const buildTheDebts = async () => {
    const debts = document.querySelectorAll('.item-debt');

    let debtsObject = {};

    debts.forEach((debt) => {
      let debtName = '';

      debt.childNodes.forEach((child) => {
        const superChild = child.childNodes[0].childNodes[0];

        if (superChild.getAttribute('name') === 'debts-name') {
          debtName = superChild.value;
        } else if (superChild.getAttribute('name') === 'debts-amount') {
          debtsObject = {
            ...debtsObject,
            [debtName]: superChild.value,
          };
        }
      });
    });

    return debtsObject;
  };

  const buildTheSavings = async () => {
    const savings = document.querySelectorAll('.item-saving');

    let savingsObject = {};

    savings.forEach((saving) => {
      let savingName = '';

      saving.childNodes.forEach((child) => {
        const superChild = child.childNodes[0].childNodes[0];

        if (superChild.getAttribute('name') === 'savings-name') {
          savingName = superChild.value;
        } else if (superChild.getAttribute('name') === 'savings-amount') {
          savingsObject = {
            ...savingsObject,
            [savingName]: superChild.value,
          };
        }
      });
    });

    return savingsObject;
  };

  const handleAddSheet = async () => {
    const categories = await buildTheCategories();
    const debts = await buildTheDebts();
    const savings = await buildTheSavings();

    const infoToPassOn = {
      ...accountInformation,
      categories: categories,
      debts: debts,
      savings: savings,
    };

    const resultCreation = await createNewMonthlySheet(id, infoToPassOn);

    if (resultCreation.status === 200) {
      if (resultCreation.data.duplicate) {
        setCantAddSheet('There is already a budget sheet for this month.');
      } else {
        setCantAddSheet(
          'Sheet successfully created, you can go back to your monthly sheets :)'
        );
      }
    } else {
      setMessageAlert({
        color: 'danger',
        message:
          'There was an error creating the sheet, contact The Admin. Also make sure all the fields are properly filled.',
      });
      setCantAddSheet(
        'There was an error creating the sheet, contact The Admin. Also make sure all the fields are properly filled'
      );
    }
  };

  const total =
    accountInformation.netIncome -
    accountInformation.overspentLastMonth -
    accountInformation.totalDistributed;

  return (
    <div className="new-sheet">
      {messageAlert.message ? (
        <Alert
          variant={messageAlert.color}
          onClose={() => setMessageAlert({})}
          dismissible
        >
          {messageAlert.message}
        </Alert>
      ) : (
        ''
      )}
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <h2>Type in your information</h2>
            <p>
              That will help you have an overview of what resources you'll have
              this month
            </p>
            <table className="table-tutorial overview">
              <tbody>
                <tr>
                  <th className="left-col">Month</th>
                  <th className="right-col">
                    <ClassicInput
                      type="month"
                      name="month"
                      id="month"
                      onChange={handleChangeInformation}
                      min="1900-01"
                      max="2030-12"
                    />
                  </th>
                </tr>
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
                    <tr className="item-debt">
                      <td className="left-col">
                        <ClassicInput
                          type="text"
                          placeholder="Name"
                          name={`debts-name`}
                          id={`debts-name-${i + 1}`}
                          key={i + 1}
                        />
                      </td>
                      <td className="right-col">
                        <ClassicInput
                          type="text"
                          placeholder="Amount"
                          data-type="debts-amount"
                          name="debts-amount"
                          id={`debts-${i + 1}`}
                          key={i + 1}
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
                    <tr className="item-saving">
                      <td className="left-col">
                        <ClassicInput
                          type="text"
                          placeholder="Name"
                          name={`savings-name`}
                          id={`savings-name-${i + 1}`}
                          key={i + 1}
                        />
                      </td>
                      <td className="right-col">
                        <ClassicInput
                          type="text"
                          placeholder="Amount"
                          data-type="savings-amount"
                          name="savings-amount"
                          id={`savings-${i + 1}`}
                          key={i + 1}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
          <Col xs={12} md={6}>
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
                    <tr className="item-category">
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

            <ClassicButton onClick={handleAddSheet}>Add sheet</ClassicButton>
            {cantAddSheet ? (
              <p>
                {cantAddSheet} <br />{' '}
                <Link to={`/${id}`}>Go back to your sheets</Link>
              </p>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewSheet;
