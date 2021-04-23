import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import './home-content.styles.scss';

import Container from 'react-bootstrap/Container';

import _ from 'lodash';

import MonthlySheet from '../monthly-sheet/monthly-sheet.component';

import { getAllMonthlySheets } from '../../api/monthly-sheet.api';

import WaitingForAJob from '../../assets/waiting.svg';

const HomeContent = () => {
  let { id } = useParams();

  const [allSheets, setAllSheets] = useState([]);
  const [monthlySheet, setMonthlySheet] = useState({});

  const feedMonthlySheets = async () => {
    const allMonthlySheets = await getAllMonthlySheets(id);

    setAllSheets(allMonthlySheets);
  };

  const handleSelectMonth = async (event) => {
    const target = event.target;
    const currentActive = document.querySelectorAll('.item-slider.active');

    if (currentActive.length !== 0) {
      document
        .querySelectorAll('.item-slider.active')[0]
        .classList.remove('active');
    }

    target.classList.add('active');

    const selectedMonthlySheet = allSheets.find((sheet) => {
      return sheet.month === target.dataset.id;
    });

    if (selectedMonthlySheet) {
      setMonthlySheet(selectedMonthlySheet);
    }
  };

  useEffect(() => {
    feedMonthlySheets();
  }, []);

  return (
    <div className="home-content">
      <Container>
        <nav className="sheet-browser">
          {allSheets
            ? allSheets.map((sheet) => {
                return (
                  <div
                    className="item-slider"
                    onClick={handleSelectMonth}
                    data-id={sheet.month}
                    key={sheet['_id']}
                  >
                    {sheet.month}
                  </div>
                );
              })
            : 'No sheets to fetch'}
        </nav>
        {!_.isEmpty(monthlySheet) ? (
          <>
            <MonthlySheet monthlySheetData={monthlySheet} />
          </>
        ) : document.querySelectorAll('.item-slider.active').length === 0 ? (
          <div className="select-a-month">
            <h3>Select a month to see your data</h3>
            <img src={WaitingForAJob} alt="Select a month" />
          </div>
        ) : (
          <div className="select-a-month">
            <h3>
              Looks like there's no data for this month, if this is not normal,{' '}
              <a href="mailto:mael.landrin@gmail.com">contact The Admin</a>
            </h3>
            <p>
              <em>That's me, it just looks cooler to say "The Admin"</em>
            </p>
            <img src={WaitingForAJob} alt="Select a month" />
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomeContent;
