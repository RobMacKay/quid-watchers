import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import _ from 'lodash';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ClassicInput from '../../components/classic-input/classic-input.component';
import ClassicButton from '../../components/classic-button/classic-button.component';

import './new-sheet.styles.scss';

import { createNewMonthlySheet } from '../../firebase/firebase.utils';

const NewSheet = () => {
  const { id } = useParams();

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
    } else if (name === 'month') {
      const newDate = new Date(value);
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
      }).format(newDate);

      setAccountInformation({
        ...accountInformation,
        [name]: formattedDate + ` ${newDate.getFullYear()}`,
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

  const handleAddSheet = async () => {
    const categories = await buildTheCategories();

    const infoToPassOn = {
      ...accountInformation,
      categories: categories,
    };

    const resultCreation = await createNewMonthlySheet(id, infoToPassOn);

    if (resultCreation.length !== 0) {
      setCantAddSheet('A sheet has already been created for this month');
    }
    if (resultCreation === false) {
      setCantAddSheet(
        'There was an error creating the sheet, contact The Admin. Also make sure all the fields are properly filled'
      );
    }
    if (resultCreation === true) {
      setCantAddSheet(
        'Sheet successfully created, you can go back to your monthly sheets :)'
      );
    }
  };

  const total =
    accountInformation.netIncome -
    accountInformation.overspentLastMonth -
    accountInformation.totalDistributed;

  return (
    <div className="new-sheet">
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
                      value={accountInformation.month}
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
                    <tr>
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
                    <tr>
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
