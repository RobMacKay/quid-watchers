import React, {useState, useEffect} from 'react';

import {
  PieChart, Pie, Cell, Sector
} from 'recharts';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ClassicInput from '../classic-input/classic-input.component';

import './monthly-sheet.styles.scss';

const MonthlySheet = ({ monthlySheetData }) => {
  const [categoriesData, setCategoriesData] = useState([]);

  const RADIAN = Math.PI / 180;
  const COLORS = ['#23CE6B', '#272D2D', '#A846A0', '#FF8042', '#FFD166', '#118AB2', '#EF476F'];

  useEffect(() => {
    let categoriesArray = [];

    Object.entries(monthlySheetData.categories).forEach(category => {
      categoriesArray = [...categoriesArray, {
        name: category[0],
        value: parseInt(category[1]),
      }]
    })

    setCategoriesData(categoriesArray);
  }, [])

  const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index,}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">

        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };  

  return(
    <div className="content-sheets">
      {
        // console.log(monthlySheetData)
      }
      <div className="sheet-data">
        <Row>
          <Col xs={12} md={6}>
            <h2>Overview</h2>
            <table className="table-tutorial overview">
              <tbody>
                <tr>
                  <th className="left-col">Net Income</th>
                  <th className="right-col"><ClassicInput type="text" name="netIncome" id="netIncome" value={monthlySheetData.netIncome} readOnly /></th>
                </tr>
                <tr>
                  <td className="left-col">Overspent last month</td>
                  <td className="right-col"><ClassicInput type="text" name="overspentLastMonth" id="overspentLastMonth" value={monthlySheetData.overspentLastMonth} readOnly /></td>
                </tr>
                <tr>
                  <td className="left-col">Net Income minus overspent</td>
                  <td className="right-col"><ClassicInput type="text" name="netMinusOverspent" id="netMinusOverspent" value={monthlySheetData.netIncome - monthlySheetData.overspentLastMonth} readOnly /></td>
                </tr>
                <tr className="separator">
                  <td className="left-col title">DEBTS</td>
                  <td className="right-col">
                  </td>
                </tr>
                {
                  Object.keys(monthlySheetData.debts).map((keyName, keyIndex) => {
                    return(
                      <tr key={keyIndex}>
                        <td className="left-col">Debt {keyIndex+1}</td>
                        <td className="right-col">{monthlySheetData.debts[keyName]}</td>
                      </tr>
                    )
                  })
                }
                <tr className="separator">
                  <td className="left-col title">SAVINGS</td>
                  <td className="right-col">
                  </td>
                </tr>
                {
                  Object.keys(monthlySheetData.savings).map((keyName, keyIndex) => {
                    return(
                      <tr key={keyIndex}>
                        <td className="left-col">Saving {keyIndex+1}</td>
                        <td className="right-col">{monthlySheetData.savings[keyName]}</td>
                      </tr>
                    )
                  })
                }
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
                  {
                    categoriesData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
              </PieChart>
              <div className="legend">
                {
                  categoriesData.map((entry, index) => {
                    return(
                      <div className="legend-item" key={`legend-${index}`}>
                        <div className="small-square" style={{backgroundColor: COLORS[index]}}></div>
                        <span>{categoriesData[index].name} - {categoriesData[index].value}€</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="detailed-part">
              <table className="table-tutorial distribute">
                <tbody>
                  <tr className="separator">
                  <td className="left-col title">BUDGET CATEGORIES</td>
                    <td className="right-col">
                    </td>
                  </tr>
                  {
                    console.log(monthlySheetData.categories)
                  }
                  {
                    Object.entries(monthlySheetData.categories).map(category => {
                      // categoriesArray = [...categoriesArray, {
                      //   name: category[0],
                      //   value: parseInt(category[1]),
                      // }]
                      return (
                        <tr className="item-category">
                          <td className="left-col">
                            <ClassicInput 
                              type="text" 
                              placeholder="Name" 
                              name={`categories-name`} 
                              value={category[0]} />
                          </td>
                          <td className="right-col">
                            <ClassicInput 
                              type="text" 
                              placeholder="Amount" 
                              data-type="categories-amount"
                              name="categories-amount" 
                              value={category[1]} />
                            </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default MonthlySheet;