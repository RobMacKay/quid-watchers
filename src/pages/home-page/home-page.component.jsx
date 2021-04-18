import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import './home-page.styles.scss';

import HomeContent from '../../components/home-content/home-content.component';
import Tutorial from '../../components/tutorial/tutorial.component';

import { getUser } from '../../api/monthly-sheet.api';

const HomePage = () => {
  let { id } = useParams();
  const [hasAlreadyTutoed, setHasAlreadyTutoed] = useState('');

  const fetchUser = useCallback(async () => {
    const user = await getUser(id);

    setHasAlreadyTutoed(user.hasAlreadyTutoed);
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="home-page">
      {hasAlreadyTutoed === '' ? (
        <div className="spinner"></div>
      ) : hasAlreadyTutoed ? (
        <HomeContent />
      ) : (
        <Tutorial />
      )}
    </div>
  );
};

export default HomePage;
