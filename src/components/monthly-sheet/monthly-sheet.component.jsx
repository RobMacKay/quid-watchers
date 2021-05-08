import React, { useState, useEffect } from 'react';

import { PieChart, Pie, Cell } from 'recharts';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ClassicInput from '../classic-input/classic-input.component';

import './monthly-sheet.styles.scss';
import ClassicButton from '../classic-button/classic-button.component';
import { useParams } from 'react-router-dom';
import { addSpending } from '../../api/monthly-sheet.api';
import { Table } from 'react-bootstrap';

const MonthlySheet = ({ monthlySheetData, setIsFetching, isFetching }) => {
  let { id } = useParams();
  const [categoriesData, setCategoriesData] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [spendingTotals, setSpendingTotals] = useState({});
  const [spendingData, setSpendingData] = useState({
    category: '',
    amount: 0,
  });

  const COLORS = [
    '#7d87b9',
    '#bb7784',
    '#d5eae7',
    '#f3e1eb',
    '#8e063b',
    '#d33f6a',
    '#11c638',
    '#ef9708',
    '#8dd593',
    '#4a6fe3',
    '#023fa5',
    '#f6c4e1',
    '#9cded6',
    '#c6dec7',
    '#d6bcc0',
    '#bec1d4',
    '#ead3c6',
    '#f0b98d',
    '#0fcfc0',
    '#f79cd4',
  ];

  useEffect(() => {
    let categoriesArray = [];
    setCategoriesList([]);
    setCategoriesData([]);

    if (monthlySheetData.categories) {
      Object.entries(monthlySheetData.categories[0]).forEach((category) => {
        categoriesArray.push({
          name: category[0],
          value: parseInt(category[1]),
        });
      });

      let categories = [];

      categoriesArray.forEach((category) => {
        categories.push(category.name);
      });

      setCategoriesList(categories);
      setCategoriesData(categoriesArray);
    }

    if (monthlySheetData.spendings) {
      let totalCategories = {};
      monthlySheetData.spendings.forEach((spending) => {
        const detailsSpending = Object.entries(spending)[0];

        if (detailsSpending) {
          if (totalCategories.hasOwnProperty(detailsSpending[0])) {
            totalCategories[detailsSpending[0]] =
              parseInt(totalCategories[detailsSpending[0]]) +
              parseInt(detailsSpending[1]);
          } else {
            totalCategories[detailsSpending[0]] = parseInt(detailsSpending[1]);
          }
        }
      });

      setSpendingTotals(totalCategories);
    }
  }, [monthlySheetData, spendingData]);

  const handleChangeSpending = (event) => {
    const { name, value } = event.target;

    setSpendingData({
      ...spendingData,
      [name]: value,
    });
  };

  const handleAddSpending = async () => {
    setIsFetching(true);
    await addSpending(
      id,
      monthlySheetData.month,
      spendingData.category,
      spendingData.amount
    );

    setSpendingData({
      ...spendingData,
      amount: 0,
    });
    setIsFetching(false);
  };

  return (
    <div className="content-sheets">
      <div className="sheet-data">
        <Row>
          <Col xs={12} md={6}>
            <h2>Overview</h2>
            <table className="table-tutorial overview">
              <tbody>
                <tr>
                  <th className="left-col">Net Income</th>
                  <th className="right-col">
                    <ClassicInput
                      type="text"
                      name="netIncome"
                      id="netIncome"
                      readOnly
                      value={monthlySheetData.netIncome}
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
                      readOnly
                      value={monthlySheetData.overspentLastMonth}
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
                      readOnly
                      value={
                        monthlySheetData.netIncome -
                        monthlySheetData.overspentLastMonth
                      }
                    />
                  </td>
                </tr>
                <tr className="separator">
                  <td className="left-col title">DEBTS</td>
                  <td className="right-col"></td>
                </tr>
                {monthlySheetData.debts[0]
                  ? Object.entries(monthlySheetData.debts[0]).map(
                      (key, value) => {
                        return (
                          <tr className="item-debt" key={`${key}-${value}`}>
                            <td className="left-col">
                              <ClassicInput
                                type="text"
                                placeholder="Name"
                                name={`debts-name`}
                                value={key[0]}
                                readOnly
                              />
                            </td>
                            <td className="right-col">
                              <ClassicInput
                                type="text"
                                placeholder="Amount"
                                data-type="debts-amount"
                                name="debts-amount"
                                value={key[1]}
                                readOnly
                              />
                            </td>
                          </tr>
                        );
                      }
                    )
                  : ''}
                <tr className="separator">
                  <td className="left-col title">SAVINGS</td>
                  <td className="right-col" />
                </tr>
                {monthlySheetData.savings[0]
                  ? Object.entries(monthlySheetData.savings[0]).map(
                      (key, value) => {
                        return (
                          <tr className="item-saving" key={`${key}-${value}`}>
                            <td className="left-col">
                              <ClassicInput
                                type="text"
                                placeholder="Name"
                                name={`savings-name`}
                                value={key[0]}
                                readOnly
                              />
                            </td>
                            <td className="right-col">
                              <ClassicInput
                                type="text"
                                placeholder="Amount"
                                data-type="savings-amount"
                                name="savings-amount"
                                value={key[1]}
                                readOnly
                              />
                            </td>
                          </tr>
                        );
                      }
                    )
                  : ''}
              </tbody>
            </table>
          </Col>
          <Col xs={12} md={6}>
            <h2>Detailed budget</h2>
            <div className="chart-part">
              <PieChart width={400} height={400}>
                <Pie
                  data={categoriesData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {monthlySheetData.categories[0]
                    ? Object.entries(monthlySheetData.categories[0]).map(
                        (currElement, index) => {
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          );
                        }
                      )
                    : ''}
                </Pie>
              </PieChart>
              <div className="legend">
                {monthlySheetData.categories[0]
                  ? Object.entries(monthlySheetData.categories[0]).map(
                      (currElement, index) => {
                        return (
                          <div className="legend-item" key={`legend-${index}`}>
                            <div
                              className="small-square"
                              style={{ backgroundColor: COLORS[index] }}
                            />
                            <span>
                              {currElement[0]} - {currElement[1]}€
                            </span>
                          </div>
                        );
                      }
                    )
                  : ''}
              </div>
            </div>
            <div className="detailed-part">
              <table className="table-tutorial distribute">
                <tbody>
                  <tr className="separator">
                    <td className="left-col title">BUDGET CATEGORIES</td>
                    <td className="right-col" />
                  </tr>
                  {monthlySheetData.categories[0]
                    ? Object.entries(monthlySheetData.categories[0]).map(
                        (key, value) => {
                          return (
                            <tr
                              className="item-category"
                              key={`${key}-${value}`}
                            >
                              <td className="left-col">
                                <ClassicInput
                                  type="text"
                                  placeholder="Name"
                                  name={`categories-name`}
                                  value={key[0]}
                                  readOnly
                                />
                              </td>
                              <td className="right-col">
                                <div className="pseudo-input">
                                  {key[1]}{' '}
                                  {spendingTotals[key[0]] ? (
                                    <span className="spent">
                                      - spent {spendingTotals[key[0]]}
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                </div>
                                {/*<ClassicInput*/}
                                {/*  type="text"*/}
                                {/*  placeholder="Amount"*/}
                                {/*  data-type="categories-amount"*/}
                                {/*  name="categories-amount"*/}
                                {/*  value={`${*/}
                                {/*    key[1]*/}
                                {/*  } - <span className="spent">spent ${*/}
                                {/*    spendingTotals[key[0]]*/}
                                {/*  }</span>`}*/}
                                {/*  readOnly*/}
                                {/*/>*/}
                              </td>
                            </tr>
                          );
                        }
                      )
                    : ''}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className="spendings">
            <div className="title-div">
              <h2>Spendings</h2>
              <div className="input-group">
                <ClassicInput
                  handleChange={(e) => handleChangeSpending(e)}
                  placeholder="Category"
                  type="select"
                  id="category"
                  name="category"
                  value={spendingData.category}
                  data={categoriesList ? categoriesList : ''}
                />
                <ClassicInput
                  handleChange={(e) => handleChangeSpending(e)}
                  placeholder="Amount"
                  type="text"
                  id="amount"
                  name="amount"
                  value={spendingData.amount}
                />
                <ClassicButton handleClick={handleAddSpending}>
                  Add
                </ClassicButton>
              </div>
            </div>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySheetData.spendings[0]
                    ? monthlySheetData.spendings.map((spending, key) => {
                        return (
                          <tr key={key}>
                            <td>{Object.keys(spending)}</td>
                            <td>{Object.values(spending)}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MonthlySheet;
