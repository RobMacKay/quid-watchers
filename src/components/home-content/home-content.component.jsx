import React, {useEffect, useState, useCallback} from 'react';
import { useParams } from 'react-router-dom';

import './home-content.styles.scss';

import Container from 'react-bootstrap/Container';

import MonthlySheet from '../monthly-sheet/monthly-sheet.component';

import { getAllMonthlySheets, getOneMonthlySheet } from '../../firebase/firebase.utils';

import WaitingForAJob from '../../assets/waiting.svg';

const HomeContent = () => {
  let { id } = useParams();

  const [sheetIds, setSheetIds] = useState([]);
  const [monthlySheet, setMonthlySheet] = useState([]);

  const feedMonthlySheets = useCallback(async () => {
    const allMonthlySheets = await getAllMonthlySheets(id);
    setSheetIds(allMonthlySheets);
  }, [id])

  const handleSelectMonth = async (event) => {
    const target = event.target;
    const currentActive = document.querySelectorAll('.item-slider.active');

    if(currentActive.length !== 0) {
      document.querySelectorAll('.item-slider.active')[0].classList.remove('active'); 
    }

    target.classList.add('active');

    const monthlySheetData = await getOneMonthlySheet(id, target.dataset.id);

    setMonthlySheet(monthlySheetData);
  }

  useEffect(() => {
    feedMonthlySheets()
  }, [feedMonthlySheets]);

  return (
    <div className="home-content">
      <Container>
        <nav className="sheet-browser">
          {
            sheetIds ? 
            sheetIds.map(id => {
              return(
                <div className="item-slider" onClick={handleSelectMonth} data-id={id} key={id}>
                  {
                    id.toString()
                  }
                </div>
              )
            })
            : 'No sheets to fetch'
          }
        </nav>
        {
          Object.keys(monthlySheet).length > 1 ?
          <MonthlySheet monthlySheetData={monthlySheet} />
          : 
          (
            document.querySelectorAll('.item-slider.active').length === 0 ?
            <div className="select-a-month">
              <h3>Select a month to see your data</h3>
              <img src={WaitingForAJob} alt="Select a month" />
            </div>
            : 
            <div className="select-a-month">
              <h3>Looks like there's no data for this month, if this is not normal, <a href="mailto:mael.landrin@gmail.com">contact The Admin</a></h3>
              <p><em>That's me, it just looks cooler to say "The Admin"</em></p>
              <img src={WaitingForAJob} alt="Select a month" />
            </div>
          )
        }
      </Container>
    </div>
  )
};

export default HomeContent;